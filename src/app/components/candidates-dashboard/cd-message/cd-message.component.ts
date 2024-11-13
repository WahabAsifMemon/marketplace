import { Component, OnInit, OnDestroy } from '@angular/core'; // Import OnDestroy
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { ActivatedRoute } from '@angular/router';
interface Message {
  from_id: number;
  to_id: number;
  message: string;
  created_at: string; // Adjust type if necessary
}

interface User {
  id: number;
  profile_image: string;
  first_name: string;
  status: string;
  lastMessageTime: string;
  unreadMessages: number;
}

@Component({
  selector: 'app-cd-message',
  templateUrl: './cd-message.component.html',
  styleUrls: ['./cd-message.component.scss']
})
export class CdMessageComponent implements OnInit, OnDestroy {
  users: User[] = [];
  selectedUser: any = null;
  messages: any[] = [];
  newMessage: string = '';
  currentUserId: number | null = null;
  unreadCounts: { [key: number]: number } = {};

  constructor(private helper: HelperService, private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.getChatedUser();
    this.listenForMessages();
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadUsers(id);
      } else {
        console.warn('No user ID found in query parameters.');
      }
    });
  }

  ngOnDestroy(): void {
    // When leaving the component, send the messages to the server
    this.sendMessagesToServer();
  }

  async loadUsers(id: string) {
    try {
      const res: any = await this.http.get(`message/get_all_employer/${id}`, true).toPromise();
      const user = res?.user;
      console.log(user, 'Fetched user data');
      if (user) {
        // Check if the user is already in the users list
        if (!this.users.find(u => u.id === user.id)) {
          this.users.push(user); // Add the new user if not already present
          this.unreadCounts[user.id] = 0; // Initialize unread counts
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }



  async getChatedUser() {
    try {
      const res: any = await this.http.get(`message/get_all_chated_user`, true).toPromise();
      const fetchedUsers = res?.users;

      if (Array.isArray(fetchedUsers)) {
        fetchedUsers.forEach((user: User) => {
          // Check if the user is already in the users list
          if (!this.users.find(u => u.id === user.id)) {
            this.users.push(user); // Add the new user if not already present
            this.unreadCounts[user.id] = 0; // Initialize unread counts
          }
        });
      }

      console.log(this.users, 'Fetched chatted users');
    } catch (error) {
      console.error('Error fetching chatted users:', error);
    }
  }


  loadCurrentUser() {
    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.currentUserId = parseInt(userIdString, 10);
      console.log('Current user ID:', this.currentUserId);
    } else {
      console.warn('No user ID found in localStorage.');
      this.currentUserId = null;
    }
  }

  loadChat(user: any) {
    this.selectedUser = user;
    this.messages = [];
    this.unreadCounts[user.id] = 0;
    this.sortUsersByUnreadCount();

    this.http.get(`message/get_user_chat/${user.id}`, true)
      .toPromise()
      .then((res: any) => {
        if (res.success) {
          res.messages.forEach((chat: any) => {
            if (chat.message && Array.isArray(chat.message)) {
              this.messages.push(...chat.message.map((msg: Message) => ({
                from_id: msg.from_id,
                to_id: msg.to_id,
                message: msg.message,
                created_at: msg.created_at,
                time: new Date(msg.created_at).toLocaleTimeString()
              })));
            }
          });
          console.log('Loaded messages:', this.messages);
        } else {
          console.error('Failed to fetch messages', res);
        }
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }


  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser && this.currentUserId) {
      const messageData = {
        from_id: this.currentUserId,
        to_id: this.selectedUser.id,
        message: this.newMessage,
        created_at: new Date(),
      };

      this.messages.push({
        ...messageData,
        time: new Date().toLocaleTimeString(),
      });

      this.newMessage = '';
      this.helper.sendMessage(messageData);
    }
  }

  closeChat() {
    this.selectedUser = null; // This will hide the chat body
  }


  sendMessagesToServer() {
    if (this.messages.length > 0 && this.selectedUser) { // Check if selectedUser is defined
      const messagesData = this.messages.map(message => ({
        from_id: message.from_id,
        to_id: message.to_id,
        message: message.message,
        created_at: message.created_at,
      }));

      const to_id = this.selectedUser.id; // Get to_id from selectedUser

      this.http.post('message/send_message', { message: messagesData, to_id: to_id }, true)
        .toPromise()
        .then((res: any) => {
          if (res.success) {
            console.log('Messages saved successfully', res);
          } else {
            console.error('Failed to save messages', res);
          }
        })
        .catch((error) => {
          console.error('Error saving messages:', error);
        });
    }
}




  listenForMessages() {
    this.helper.listenForMessages().subscribe((data: any) => {
      if (this.selectedUser && data.from_id === this.selectedUser.id) {
        this.messages.push({
          ...data,
          time: new Date().toLocaleTimeString(),
        });
      } else {
        this.unreadCounts[data.from_id] = (this.unreadCounts[data.from_id] || 0) + 1;
        this.sortUsersByUnreadCount();
      }
    });
  }

  sortUsersByUnreadCount() {
    // Sorting logic (if needed)
  }
}
