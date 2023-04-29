import { Injectable } from "@angular/core";

@Injectable()
export class ImageService{
    constructor(){}

    imageUrl = '../../assets/popbooks/';
    bookPics = [
        {name: 'Learn Java 17', image: this.imageUrl+'java17.jpg'},
        {name: 'The Subtle Art of Not Giving a F*ck', image: this.imageUrl+'subtleart.jpg'},
        {name: 'Everything is F*cked', image: this.imageUrl+'mmevery.jpg'},
        {name: 'In Cold Blood', image: this.imageUrl+'tcInColdBlood.jpg'},
        {name: 'The Cold Millions', image: this.imageUrl+'theCold.jpg'},
        {name: 'One Good Deed', image: this.imageUrl+'oneGoodDeed.jpg'},
        {name: 'Calculus 12th Edition', image: this.imageUrl+'calculus.jpg'},
        {name: 'C++ Software Design', image: this.imageUrl+'cplusplus.jpg'}
    ]
      getBook(name: any){
        for (let book of this.bookPics){
            if (name === book.name){
                // console.log(book.image)
                return book.image;
            }
        }
        return '../../assets/bookcoffe.jpg';
      }
      getAllBooks(){
        return this.bookPics;
      }
}