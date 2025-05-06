import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TagModule,
    TooltipModule,
    RippleModule,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  constructor(private messageService: MessageService) {}

  theme: string = 'light';

  ngOnInit() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      this.theme = 'dark';
      this.applyTheme('dark');
    } else {
      this.applyTheme('light');
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleDarkMode() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);
  }

  applyTheme(theme: string) {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme === 'dark'
        ? 'https://cdn.jsdelivr.net/npm/primeng@16.4.0/resources/themes/lara-dark-indigo/theme.min.css'
        : 'https://cdn.jsdelivr.net/npm/primeng@16.4.0/resources/themes/lara-light-indigo/theme.min.css';
    }

    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  copiarTexto() {
    const texto = 'ing.gael90@gmail.com';

    navigator.clipboard.writeText(texto).then(() => {
      this.messageService.add({ severity: 'info', summary: 'Correo copiado', life: 3000 });
    }).catch(() => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo copiar el texto.',life: 3000});
    });
  }

  openLink() {
    window.open('https://drive.google.com/file/d/11MYpjLkBH_exRX5yf6NWs0Xnu2DOyqkt/view?usp=sharing', '_blank');
  }



}
