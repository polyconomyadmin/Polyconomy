// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { GuestChatComponent } from './guest-chat.component';

// describe('GuestChat', () => {
//   let component: GuestChatComponent;
//   let fixture: ComponentFixture<GuestChatComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [GuestChatComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(GuestChatComponent);
//     component = fixture.componentInstance;
//     await fixture.whenStable();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

interface Chat {
  chat_id: string;
  title: string;
  messages: Message[];
  showOptions?: boolean;
}

@Component({
  selector: 'app-guest-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guest-chat.component.html',
  styleUrls: ['./guest-chat.component.css']
})
export class GuestChatComponent implements OnInit {
  chats: Chat[] = [];
  currentChat: Chat | null = null;
  newMessage: string = '';

  showDeleteModal: boolean = false;
  chatToDelete: Chat | null = null;

  showLimitModal: boolean = false;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit() {
    // create initial chat
    this.createNewChat(false);
  }

  // Create a new chat
  createNewChat(addToSidebar = true) {
    const newChat: Chat = {
      chat_id: Date.now().toString(), // simple unique id
      title: `Chat #${this.chats.length + 1}`,
      messages: []
    };

    if (addToSidebar) {
      this.chats = [newChat, ...this.chats];
    } else {
      this.chats.push(newChat);
    }

    this.currentChat = newChat;

    // AI welcome message
    this.addAIMessage(this.currentChat, "Hello! Ask me anything.");
  }

  // Select chat
  selectChat(chat: Chat) {
    this.currentChat = chat;
    setTimeout(() => this.scrollToBottom(), 50);
  }

  // Send user message
  sendMessage() {
    if (!this.newMessage.trim() || !this.currentChat) return;

    // Count user messages
    const userMsgCount = this.currentChat.messages.filter(m => m.sender === 'user').length;

    if (userMsgCount >= 5) {
      this.showLimitModal = true;
      return;
    }

    const text = this.newMessage;
    this.currentChat.messages.push({ text, sender: 'user' });
    this.scrollToBottom();
    this.newMessage = '';

    // Add AI response
    this.addAIMessage(this.currentChat, "This is a temporary AI response.");
  }

  // Add AI message
  addAIMessage(chat: Chat, text: string) {
    chat.messages.push({ text, sender: 'ai' });
    this.scrollToBottom();
  }

  // Auto-resize textarea
  autoResize(event: any) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  // Handle Enter key
  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // Scroll to bottom of messages
  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }

  // Delete chat
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

    this.chats = this.chats.filter(c => c.chat_id !== this.chatToDelete!.chat_id);

    if (this.currentChat?.chat_id === this.chatToDelete.chat_id) {
      this.currentChat = this.chats.length > 0 ? this.chats[0] : null;
    }

    this.closeDeleteModal();
  }

  // Close message limit modal
  closeLimitModal() {
    this.showLimitModal = false;
  }

  // Navigate to landing/sign-in
  goToSignIn() {
    this.router.navigate(['/landing']);
  }

  // Toggle chat options
  toggleOptions(chat: Chat, event: MouseEvent) {
    event.stopPropagation();
    this.chats.forEach(c => {
      if (c.chat_id !== chat.chat_id) c.showOptions = false;
    });
    chat.showOptions = !chat.showOptions;
  }
}
