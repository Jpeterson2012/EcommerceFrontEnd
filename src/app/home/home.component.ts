import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  images = [
    {name: 'SubtleArt',image: '/assets/popbooks/mmevery.jpg'},
    {name: 'OneGoodDeed',image: '/assets/popbooks/oneGoodDeed.jpg'},
    {name: 'SubtleArt',image: '/assets/popbooks/subtleart.jpg'},
    {name: 'SubtleArt',image: '/assets/popbooks/tcInColdBlood.jpg'},
    {name: 'SubtleArt',image: '/assets/popbooks/theCold.jpg'}
  ]
}
