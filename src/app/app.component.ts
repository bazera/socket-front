import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

interface Message {
  text: string;
  name: string;
  self: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  socket: Socket | undefined;
  model: string = '';
  user: string = 'bazera';

  messages: Message[] = [];

  sendMessage() {
    if (!this.model) {
      return;
    }

    const message = {
      text: this.model,
      name: this.user,
      self: true,
    };

    this.socket?.emit('send-message', message);
    this.messages.push(message);

    this.model = '';
  }

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  ngOnInit() {
    this.socket = io('http://localhost:3000');

    this.socket.on('receive-message', (message) => {
      this.messages.push({
        text: message.text,
        name: message.name,
        self: false,
      });
    });
  }
}
