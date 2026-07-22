import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Pin, Trash2, Menu, Send, Globe, Copy, Share2, Volume2, RotateCcw, Pencil, Square, Plus } from 'lucide-angular';
import { RagService } from '../../services/rag.service';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp?: string;
  editing?: boolean;
  editText?: string;
  speaking?: boolean;
}

interface Chat {
  chat_id: string;
  title: string;
  messages: Message[];
  pinned?: boolean;
  showOptions?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: any;
  chats: Chat[] = [];
  pinnedChats: Chat[] = [];
  otherChats: Chat[] = [];
  currentChat: Chat | null = null;
  newMessage: string = '';
  API = 'https://polyconomy-ai-bf583cb75ac1.herokuapp.com/api/users';
  icons = { Pin, Trash2, Menu, Send, Globe, Copy, Share2, Volume2, RotateCcw, Pencil, Square, Plus };

  showDeleteModal: boolean = false;
  chatToDelete: Chat | null = null;

  pinnedCollapsed: boolean = false;
  otherCollapsed: boolean = false;

  sidebarOpen: boolean = true;

  // Streaming state (Base44-style word-by-word reveal)
  isGenerating = false;
  streamingText = '';
  private streamTimer: any = null;
  private cancelStream = false;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private ragService: RagService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.loadChats();

    document.addEventListener('click', () => {
      this.chats.forEach(chat => (chat.showOptions = false));
    });
  }

  // ─── Sidebar / Chat Management ────────────────────────────────────────────

  toggleOptions(chat: Chat, event: MouseEvent) {
    event.stopPropagation();
    this.chats.forEach(c => {
      if (c.chat_id !== chat.chat_id) c.showOptions = false;
    });
    chat.showOptions = !chat.showOptions;
  }

  togglePin(chat: Chat) {
    chat.pinned = !chat.pinned;
    this.http
      .post(`${this.API}/chats/${this.user.username}/${chat.chat_id}/pin/`, { pinned: chat.pinned })
      .subscribe(() => {
        this.updateChatSections();
        this.cdr.markForCheck();
      });
    chat.showOptions = false;
  }

  togglePinned() { this.pinnedCollapsed = !this.pinnedCollapsed; }
  toggleOther() { this.otherCollapsed = !this.otherCollapsed; }

  loadChats() {
    this.http.get<any>(`${this.API}/chats/${this.user.username}/`).subscribe(res => {
      this.chats = res.chats || [];
      this.updateChatSections();
      this.createNewChat(false);
      this.cdr.markForCheck();
    });
  }

  updateChatSections() {
    this.pinnedChats = this.chats.filter(c => c.pinned);
    this.otherChats = this.chats.filter(c => !c.pinned);
  }

  createNewChat(addToSidebar = true) {
    this.http.post<any>(`${this.API}/chats/${this.user.username}/new/`, {}).subscribe(res => {
      const newChat: Chat = { chat_id: res.chat_id, title: res.title, messages: [] };

      if (addToSidebar) {
        this.chats = [newChat, ...this.chats];
        this.updateChatSections();
      }

      this.currentChat = newChat;
      this.addAIMessage(
      this.currentChat,
      "Hello there! I'm Polyconomy, an AI trained on economics research and literature.\n\nI can help explain concepts, discuss theories, and explore economic ideas.\n\nPlease note, I provide information for understanding only and cannot offer personalised financial advice.\n\nThink of me as a guide to economic knowledge, not a decision-maker."
    );
    });
  }

  selectChat(chat: Chat) {
    this.currentChat = chat;
    setTimeout(() => this.scrollToBottom(), 50);
  }

  deleteChat(chat: Chat) {
    this.chatToDelete = chat;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.chatToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDeleteChat() {
    if (!this.chatToDelete) return;

    this.http
      .delete(`${this.API}/chats/${this.user.username}/${this.chatToDelete.chat_id}/delete/`)
      .subscribe(() => {
        this.chats = this.chats.filter(c => c.chat_id !== this.chatToDelete!.chat_id);
        this.updateChatSections();

        if (this.currentChat?.chat_id === this.chatToDelete?.chat_id) {
          this.currentChat = this.chats.length > 0 ? this.chats[0] : null;
        }

        this.closeDeleteModal();
        this.cdr.markForCheck();
      });
  }

  // ─── About / Contact navigation ────────────────────────────────────────────

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  // ─── Messaging ────────────────────────────────────────────────────────────

  async sendMessage() {
    if (!this.newMessage.trim() || !this.currentChat || this.isGenerating) return;

    const text = this.newMessage;
    this.currentChat.messages.push({ text, sender: 'user', timestamp: new Date().toISOString() });
    this.newMessage = '';

    // Save user message to backend
    this.http
      .post(`${this.API}/chats/${this.user.username}/${this.currentChat.chat_id}/add/`, { text, sender: 'user' })
      .subscribe();

    this.askRag(text);
  }

  /**
   * Sends a question to the RAG service and streams the reply. Separate from
   * sendMessage so "Try again" and "Edit" can regenerate without adding another
   * user bubble or re-saving the question. Reveals the reply word-by-word.
   */
  async askRag(text: string) {
    if (!this.currentChat) return;
    this.isGenerating = true;
    this.streamingText = '';
    this.cancelStream = false;
    this.cdr.markForCheck();
    this.scrollToBottom();

    // Single detect call: gives us the language AND English translation for free.
    const { lang: langToUse, translatedToEn } = await this.detectLanguage(text);
    if (this.cancelStream) return;
    console.log('[askRag] lang:', langToUse, '| query to RAG:', translatedToEn);

    this.ragService.queryRag(translatedToEn).subscribe({
      next: async (res) => {
        if (this.cancelStream) return;
        let aiResponse = res.response;
        if (langToUse !== 'en') {
          aiResponse = await this.translateText(aiResponse, langToUse);
        }
        if (this.cancelStream) return;
        this.streamResponse(aiResponse);
      },
      error: async (err) => {
        console.error('[askRag] RAG error:', err);
        if (this.cancelStream) return;
        let errorMsg = 'Sorry, something went wrong.';
        if (langToUse !== 'en') {
          errorMsg = await this.translateText(errorMsg, langToUse);
        }
        if (this.cancelStream) return;
        this.streamResponse(errorMsg);
      }
    });
  }

  /** Reveals the reply one word at a time, then commits it as a message. */
  private streamResponse(fullText: string) {
    const words = fullText.split(' ');
    let i = 0;
    this.streamTimer = setInterval(() => {
      if (this.cancelStream || i >= words.length) {
        clearInterval(this.streamTimer);
        this.streamTimer = null;
        const finalText = this.cancelStream ? (this.streamingText || '…') : fullText;
        this.streamingText = '';
        this.isGenerating = false;
        this.addAIMessage(this.currentChat!, finalText);
        this.cdr.markForCheck();
        return;
      }
      i++;
      this.streamingText = words.slice(0, i).join(' ');
      this.cdr.markForCheck();
      this.scrollToBottom();
    }, 35);
  }

  /** Stops generation: finalises whatever has streamed so far. */
  handleStop() {
    this.cancelStream = true;
    if (this.streamTimer) {
      clearInterval(this.streamTimer);
      this.streamTimer = null;
      const partial = this.streamingText || '…';
      this.streamingText = '';
      this.isGenerating = false;
      this.addAIMessage(this.currentChat!, partial);
    } else {
      this.isGenerating = false;
      this.streamingText = '';
    }
    this.cdr.markForCheck();
  }

  addAIMessage(chat: Chat, text: string) {
    const aiMessage: Message = { text, sender: 'ai', timestamp: new Date().toISOString() };
    chat.messages.push(aiMessage);
    // App runs zoneless, so async updates (RAG response / error) must
    // explicitly notify Angular to re-render the message list.
    this.cdr.markForCheck();
    this.scrollToBottom();

    // Save AI message to backend
    this.http
      .post(`${this.API}/chats/${this.user.username}/${chat.chat_id}/add/`, { text, sender: 'ai' })
      .subscribe();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // ─── Message actions (copy / share / read-aloud / edit / try-again) ────────

  copyMessage(text: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  async shareMessage(text: string) {
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({ title: 'Polyconomy', text });
      } catch { /* user cancelled */ }
    } else {
      this.copyMessage(text);
    }
  }

  toggleReadAloud(msg: Message) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (msg.speaking) {
      window.speechSynthesis.cancel();
      msg.speaking = false;
      return;
    }
    window.speechSynthesis.cancel();
    this.currentChat?.messages.forEach(m => (m.speaking = false));
    const utter = new SpeechSynthesisUtterance(msg.text);
    utter.onend = () => {
      msg.speaking = false;
      this.cdr.markForCheck();
    };
    msg.speaking = true;
    window.speechSynthesis.speak(utter);
  }

  tryAgain(index: number) {
    if (!this.currentChat) return;
    const userMsg = this.currentChat.messages[index - 1];
    if (!userMsg || userMsg.sender !== 'user') return;
    this.currentChat.messages = this.currentChat.messages.slice(0, index);
    this.askRag(userMsg.text);
  }

  startEdit(msg: Message) {
    msg.editText = msg.text;
    msg.editing = true;
  }

  cancelEdit(msg: Message) {
    msg.editing = false;
  }

  saveEdit(msg: Message, index: number) {
    if (!this.currentChat) return;
    const newText = (msg.editText ?? '').trim();
    if (!newText) return;
    msg.text = newText;
    msg.editing = false;
    msg.timestamp = new Date().toISOString();
    this.currentChat.messages = this.currentChat.messages.slice(0, index + 1);
    this.askRag(newText);
  }

  // ─── Language Detection & Translation ────────────────────────────────────

  /**
   * Detects the language of the input text.
   * Also extracts the English translation from the same API response for free,
   * so we can send clean English queries to RAG without a second API call.
   */
  async detectLanguage(text: string): Promise<{ lang: string; translatedToEn: string }> {
    try {
      const sample = text.trim().slice(0, 200);
      console.log('[detectLanguage] Input sample:', sample);

      if (sample.length < 3) {
        console.log('[detectLanguage] Sample too short, defaulting to en');
        return { lang: 'en', translatedToEn: text };
      }

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(sample)}`;
      console.log('[detectLanguage] Fetching URL:', url);

      const res = await fetch(url);
      console.log('[detectLanguage] Response status:', res.status);

      if (!res.ok) {
        console.warn('[detectLanguage] Response not OK, defaulting to en');
        return { lang: 'en', translatedToEn: text };
      }

      const data = await res.json();
      console.log('[detectLanguage] Full response data:', JSON.stringify(data));
      console.log('[detectLanguage] data[2] (detected lang):', data[2]);

      const detected: string = (data[2] as string) || 'en';
      const lang = detected.split('-')[0].toLowerCase();
      console.log('[detectLanguage] Final detected lang:', lang);

      // Extract the English translation already returned in data[0] — no extra call needed
      const translatedToEn = (data[0] as any[])
        .map((segment: any) => (Array.isArray(segment) ? segment[0] : null))
        .filter((t: any): t is string => typeof t === 'string' && t.length > 0)
        .join('') || text;

      console.log('[detectLanguage] Extracted English translation:', translatedToEn);

      document.documentElement.lang = lang;
      return { lang, translatedToEn };
    } catch (err) {
      console.warn('[detectLanguage] CAUGHT ERROR:', err);
      return { lang: 'en', translatedToEn: text };
    }
  }

  /**
   * Translates text FROM English TO the target language.
   * Chunks long text to avoid URL length limits — especially important
   * for multi-byte scripts like Sinhala, Korean, and Japanese.
   */
  async translateText(text: string, targetLang: string): Promise<string> {
    try {
      console.log('[translateText] Called with targetLang:', targetLang);
      console.log('[translateText] Text length:', text.length);
      console.log('[translateText] Text preview:', text.slice(0, 100));

      if (!text.trim() || targetLang === 'en') {
        console.log('[translateText] Skipping — empty text or target is en');
        return text;
      }

      const chunks = this.splitTextIntoChunks(text, 1000);
      console.log('[translateText] Number of chunks:', chunks.length);

      const translatedChunks: string[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        console.log(`[translateText] Chunk ${i} length:`, chunk.length);
        console.log(`[translateText] Chunk ${i} encoded length:`, encodeURIComponent(chunk).length);

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(chunk)}`;
        console.log(`[translateText] Chunk ${i} URL length:`, url.length);

        const res = await fetch(url);
        console.log(`[translateText] Chunk ${i} response status:`, res.status);

        if (!res.ok) {
          console.warn(`[translateText] Chunk ${i} failed — pushing original chunk`);
          translatedChunks.push(chunk);
          continue;
        }

        const data = await res.json();
        console.log(`[translateText] Chunk ${i} raw response:`, JSON.stringify(data));

        const translated = (data[0] as any[])
          .map((segment: any, idx: number) => {
            const val = Array.isArray(segment) ? segment[0] : null;
            console.log(`[translateText] Chunk ${i} segment ${idx}:`, segment, '→ extracted:', val);
            return val;
          })
          .filter((t: any): t is string => typeof t === 'string' && t.length > 0)
          .join('');

        console.log(`[translateText] Chunk ${i} translated result:`, translated);
        translatedChunks.push(translated || chunk);
      }

      const final = translatedChunks.join('');
      console.log('[translateText] Final joined result:', final);
      return final;
    } catch (err) {
      console.warn('[translateText] CAUGHT ERROR:', err);
      return text;
    }
  }

  /**
   * Splits long text into chunks at sentence/newline boundaries
   * to avoid hitting URL length limits for multi-byte encoded scripts.
   */
  private splitTextIntoChunks(text: string, maxLength: number): string[] {
    if (text.length <= maxLength) return [text];

    const chunks: string[] = [];
    let remaining = text;

    while (remaining.length > maxLength) {
      let splitAt = remaining.lastIndexOf('\n', maxLength);
      if (splitAt === -1) splitAt = remaining.lastIndexOf('. ', maxLength);
      if (splitAt === -1) splitAt = maxLength;

      chunks.push(remaining.slice(0, splitAt + 1));
      remaining = remaining.slice(splitAt + 1);
    }

    if (remaining.length > 0) chunks.push(remaining);
    return chunks;
  }

  // ─── UI Helpers ───────────────────────────────────────────────────────────

  translate(lang: string) {
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
    }
  }

  autoResize(event: any) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}