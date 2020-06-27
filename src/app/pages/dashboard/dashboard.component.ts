import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  src: string,
  pageName: string
}
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnDestroy {
  private alive = true;
  mySysCard: CardSettings = {
    title: 'MYSYS',
    iconClass: 'square-outline',
    type: 'primary',
    src: 'assets/images/appstore_fr.png',
    pageName: 'mysys/meteo-project'
  };
  
  
  dataPlatformCards: string;
  diversCards: string;

  dataPlatformCardsSet: CardSettings[] = [
    
  ];

  diversCardsSet: CardSettings[] = [
   
  ]

  dataPlatformCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.dataPlatformCardsSet,
      cosmic: this.dataPlatformCardsSet,
      corporate: this.dataPlatformCardsSet,
      dark: this.dataPlatformCardsSet,
    };

  diversCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.diversCardsSet,
      cosmic: this.diversCardsSet,
      corporate: this.diversCardsSet,
      dark: this.diversCardsSet,
    };


  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.dataPlatformCards = this.dataPlatformCardsByThemes[theme.name];
        this.diversCards = this.diversCardsByThemes[theme.name];
      });

  }

  ngOnDestroy() {
    this.alive = false;
  }


}
