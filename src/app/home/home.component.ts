import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import 'hammerjs';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{

  @ViewChild('container', { static: false }) card: ElementRef;
  @ViewChild('page', { static: false }) page: ElementRef;
  @ViewChild('text', { static: false }) textElement: ElementRef;

  RGB = '#000';
  x = 0;
  y=0;
  angle = 0;
  threshold = 150; // Distância para considerar swipe
  text = 'blank';

  ngAfterViewInit(): void {
    this.resetCard()
  }

  onPan(event: any) {
    this.x = event.deltaX;
    this.y = event.deltaY;
    this.angle = event.deltaX / 50; // Pequena rotação ao arrastar
    this.RGBProcess(event.deltaX);
    this.textProcess(event.deltaX);
  }

  RGBProcess(deltaX: number) {
    let percentage = Math.min(Math.abs(deltaX) / this.threshold, 1);
    this.card.nativeElement.style.boxShadow = `0px 0px 10px 5px rgba(${deltaX < 0 ? 255 : 0}, ${deltaX > 0 ? 255 : 0}, 0, ${percentage})` ;
    this.page.nativeElement.style.backgroundImage = `linear-gradient(white, rgba(${deltaX < 0 ? 255 : 0}, ${deltaX > 0 ? 255 : 0}, 0, ${percentage/4}))`;
  }

  textProcess(deltaX: number) {
    let percentage = Math.min(Math.abs(deltaX) / this.threshold, 1);
    if (deltaX > 0) {
      this.text = 'Like 💚';
    } else if (deltaX < 0) {
      this.text = 'Dislike ❌';
    } else {
      this.text = 'blank';
    }

    this.textElement.nativeElement.style.color = `rgba(${deltaX < 0 ? 255 : 0}, ${deltaX > 0 ? 255 : 0}, 0, ${percentage})`;
  }

  onPanEnd(event: any) {
    if (this.x > this.threshold) {
      console.log('💚 Like!');
    } else if (this.x < -this.threshold) {
      console.log('❌ Dislike!');
    }
    this.resetCard();
  }

  resetCard() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.text = 'blank';
    this.RGBProcess(0)
    this.textElement.nativeElement.style.color = 'transparent';
  }


  getTransform() {
    return `translate(${this.x}px, ${this.y}px) rotate(${this.angle}deg)`;
  }
}
