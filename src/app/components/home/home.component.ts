import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedTab: number | null = 0;
  tabs = [
    {
      label: 'Recents Jobs',
      cards: [
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        // {
        //   image: '../../../assets/images/nextech.png',
        //   mainHead: 'NexTech Solutions',
        //   address: 'New York, USA',
        //   heading: 'Software Developer',
        //   cardTag: 'Full Time',
        //   skills: 'CSS3, HTML5, Javascript, Bootstrap.',
        //   amount: '5000',
        //   buttonText: 'Apply Now'
        // },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
      ]
    },
    {
      label: 'Featured Jobs',
      cards: [
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
      ]
    },
    {
      label: 'Freelancer',
      cards: [
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
      ]
    },
    {
      label: 'Part Time',
      cards: [
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
      ]
    },
    {
      label: 'Full Time',
      cards: [
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/nextech.png',
          mainHead: 'NexTech Solutions',
          address: 'New York, USA',
          heading: 'Software Developer',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/greenfield.png',
          mainHead: 'GreenField Organics',
          address: 'New York, USA',
          heading: 'Agricultural Scientist',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
        {
          image: '../../../assets/images/urbanedge.png',
          mainHead: 'UrbanEdge',
          address: 'New York, USA',
          heading: 'Junior Architect',
          cardTag: 'Full Time',
          skills: 'CSS3, HTML5, Javascript, Bootstrap.',
          amount: '5000',
          buttonText: 'Apply Now'
        },
      ]
    },
  ];

  selectTab(index: number): void {
    this.selectedTab = index;
  }

  accordionItems = [
    {
      title: 'How do i create a profile on this job site?',
      content: 'Content for Accordion 1',
      open: false
    },
    {
      title: 'How can i upload my resume or CV?',
      content: 'Content for Accordion 2',
      open: false
    },
    {
      title: 'What should i include my cover letter?',
      content: 'Content for Accordion 3',
      open: false
    },
    {
      title: 'How do i search for by location?',
      content: 'Content for Accordion 4',
      open: false
    },
    {
      title: 'Can i apply multiple jobs at once?',
      content: 'Content for Accordion 5',
      open: false
    }
  ];

  toggleAccordion(index: number) {
    this.accordionItems[index].open = !this.accordionItems[index].open;
  }
}
