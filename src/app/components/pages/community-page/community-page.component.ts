import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-community',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent {
  modalReference: any;
  visibility: string = 'Public';
  public postForm: FormGroup;
  public commentForm: FormGroup;
  public commentInput: { [key: number]: string } = {};
  public replyInput: { [key: number]: string } = {};

  comments: any;
  likes: any;
  replyInputText: any = {};


  isLoading = false;
  public state: boolean = false;
  selectedFileName: string | null = null;
  isDropdownOpen: boolean = false;
  posts: any;
  firstName: string | null = null;


  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private helper: HelperService,
    private http: HttpService) {
      this.firstName = localStorage.getItem('first_name');
    this.postForm = this.fb.group({
      content: [null, [Validators.required]],
      post_img: [null, [Validators.required]],
      visibility: ['Public', [Validators.required]]  
    });

    this.commentForm = this.fb.group({
      comment: [null, [Validators.required]],
      parent_id: [null, [Validators.required]],
    });
  }


  
  ngOnInit() {
    this.loadData();
  }


  async loadData() {
    await Promise.all([this.getPosts()]);
  }

  

  openModal(content: any): void {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'custom-modal'
    });
  }

  setVisibility(option: string): void {
    this.visibility = option;
    this.postForm.controls['visibility'].setValue(option); 
    console.log('Visibility set to:', this.visibility);
  }

  closeModal(): void {
    if (this.modalReference) {
      this.modalReference.close();
    }
  }
  
  

onFileSelected(event: any): void {
  const files = event.target.files;

  if (files && files.length > 0) {
    const file = files[0];
    this.selectedFileName = file.name;
    this.helper.fileUploadHttp(files).then((result: any) => {
      const uploadedUrl = result.fileUrls && result.fileUrls[0];
      if (uploadedUrl) {
        this.postForm.patchValue({
          post_img: uploadedUrl 
        });
        console.log('File uploaded successfully:', uploadedUrl);
      } else {
        console.error('No file URL returned from upload service');
      }
    }).catch((error) => {
      console.error('Error during file upload:', error);
    });
  } else {
    console.error('No file selected.');
  }
}


submitPost() {
  const formData: any = {
    content: this.postForm.value.content,
    visibility: this.postForm.value.visibility,
    post_img: this.postForm.value.post_img 
  };

  console.log('Form data being submitted:', formData);

  this.isLoading = true;

  this.http.post('post/create_post', formData, true).subscribe(
    (res: any) => {
      console.log('Post successful:', res);
      this.proceed();
      this.isLoading = false;
      window.location.reload();
    },
    (error: any) => {
      console.error('Error creating post:', error);
      this.isLoading = false;
    }
  );
}


sendComment(postId: number) {
  const commentText = this.commentInput[postId];

  if (!commentText || commentText.trim() === '') {
    console.error('Comment cannot be empty.');
    return;
  }

  const formData: any = {
    comment: commentText,
    parent_id: postId, 
  };

  console.log('Comment being submitted:', formData);

  this.isLoading = true;

  this.http.post('comment/send_comment', formData, true).subscribe(
    (res: any) => {
      console.log('Comment submitted successfully:', res);
      this.commentInput[postId] = '';
      this.isLoading = false;
      window.location.reload();
    },
    (error: any) => {
      console.error('Error submitting comment:', error);
      this.isLoading = false;
    }
  );
}


toggleLike(post: any) {
  const formData = { post_id: post.id };

  // Store the current state before toggling
  const wasLiked = post.isLiked;

  // Optimistically update the state for smooth UI
  post.isLiked = !wasLiked;
  post.likeCount += post.isLiked ? 1 : -1;

  // Make the API call
  this.http.post('comment/send_post_like', formData, true).subscribe(
    (res: any) => {
      console.log('Like status updated successfully', res);
    },
    (error: any) => {
      console.error('Failed to update like status', error);

      // Revert changes on API error
      post.isLiked = wasLiked;
      post.likeCount += wasLiked ? -1 : 1;
    }
  );
}







sendReply(commentId: number) {
  const replyText = this.replyInputText[commentId];
  if (!replyText || replyText.trim() === '') {
    console.error('Reply cannot be empty.');
    return;
  }

  const formData = {
    comment: replyText,
    reply_id: commentId, // Link the reply to the comment
  };

  this.isLoading = true;
  this.http.post('comment/send_comment_reply', formData, true).subscribe(
    (res: any) => {
      console.log('Reply submitted:', res);
      this.replyInputText[commentId] = ''; // Clear the input field
      this.isLoading = false;
      window.location.reload(); // Reload to fetch updated comments

    },
    (error: any) => {
      console.error('Error submitting reply:', error);
      this.isLoading = false;
    }
  );
}

  proceed() {
    this.modalReference.close();
    this.state = false;
  }

  async getPosts() {
    try {
      const res: any = await this.http.get('post/get_posts', true).toPromise();
      console.log('API Response:', res);
  
      this.posts = res?.posts?.map((post: any) => {
        return {
          ...post,
          likeCount: post.likes?.length || 0, 
          isLiked: post.likes?.some((like: any) => like.user_id == localStorage.getItem('user_id')), // Check if the user liked
          comments: post.comments || [] // Attach comments
        };
      });
  
      console.log('Processed Posts:', this.posts);
  
      // Flatten all comments into the comments array for easier use
      this.comments = [];
      this.posts?.forEach((post: any) => {
        post.comments.forEach((comment: any) => {
          this.comments.push(comment);
          if (comment?.replies?.length) {
            this.comments = this.comments.concat(comment.replies);
          }
        });
      });
  
      console.log('Comments:', this.comments);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  

  get accessTokenExists(): boolean {
    return !!localStorage.getItem('token');
  }

}
