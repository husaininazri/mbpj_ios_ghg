import { Component, OnInit } from '@angular/core';
import { FaqsService } from 'src/app/shared/services/faqs/faqs.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  
  // Expansion
  panelOpenState = false

  // Data
  faqs

  constructor(
    private faqService: FaqsService
  ) { 
    this.faqs = this.faqService.faqs
  }

  ngOnInit() {}

}
