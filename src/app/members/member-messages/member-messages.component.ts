import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/Message';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() userId: number;
  messages: Message[];

  constructor(
    private userservice: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userservice.getMessageThread(this.authService.decodedToken.nameid, this.userId)
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      });
  }

}
