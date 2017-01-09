import { Component } from '@angular/core';
import {TagsService} from './services/tags.service';
import {Http, Headers} from '@angular/http';
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TagsService]
})
export class AppComponent {
  //Starting positions and title
  title = 'IS mashup test';
  orglat: number = 52;
  orglng: number = 20;
  zoom: number = 5;

  //Google maps style
  nextStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"visibility":"on"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
  
  //tag array
  tags: tag[];

  //values
  tagText: string;
  tagLat: string;
  tagLng: string;

  data1; 

  //testing values
  tags1 = [
                {
                    text: 'France',
                    lat: 46.227638,
                    lng: 2.213749,
                    woeid: '23424819',
                    trends: ''
                },
                {
                    text: 'Germany',
                    lat: 51.165691,
                    lng: 10.451526,
                    woeid: '23424829',
                    trends: ''
                },
                {
                    text: 'Austria',
                    lat: 47.516231,
                    lng: 14.550072,
                    woeid: '23424750',
                    trends: ''
                },
                {
                    text: 'Ukraine',
                    lat: 48.379433,
                    lng: 31.16558,
                    woeid: '23424976',
                    trends: ''
                },
                {
                    text: 'United States',
                    lat: 37.09024,
                    lng: -95.712891,
                    woeid: '23424977',
                    trends: ''
                },
                {
                    text: 'United Kingdom',
                    lat: 55.378051,
                    lng: -3.435973,
                    woeid: '23424975',
                    trends: ''
                },
                {
                    text: 'Belarus',
                    lat: 53.709807,
                    lng: 27.953389,
                    woeid: '23424765',
                    trends: ''
                },
                {
                    text: 'Latvia',
                    lat: 56.879635,
                    lng: 24.603189,
                    woeid: '23424874',
                    trends: ''
                },
                {
                    text: 'Poland',
                    lat: 51.919438,	
                    lng: 19.145136,
                    woeid: '23424923',	
                    trends: ''
                }
            ];

  constructor(private _tagsService:TagsService, private http: Http){
    this.getAllTags();  
  }




  getAllTags(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    //this.tags1.length
    for(var i = 0; i <this.tags1.length ; i++){
      var searchterm = 'query='+this.tags1[i].woeid;
      var newData;
      this.http.post('http://localhost:3000/country', searchterm, {headers: headers}).subscribe((res) => {
        var place = i;
        console.log(res);
        newData = res.json();
        var trending='';
        for(var j = 0; j < 4; j++){
          trending+=newData.data[0].trends[j].name;
          if(j<3) trending+=', ';
        }
        var country = newData.data[0].locations[0].name;
        for (var k = 0; k < this.tags1.length ; k++) {
          if (this.tags1[k]['text'] === country) {
              this.tags1[k].trends = trending;
          }
        }    
      });

    }
    return this.tags1;
  }
  
  //adding new tag
  addNewTag(){
    var newTag ={
      text:this.tagText,
      lat:parseFloat(this.tagLat),
      lng:parseFloat(this.tagLng)
    }
  }
}


//Tag interface
interface tag{
  text: string;
  lat: number;
  lng: number;
  woeid: string;
  trends: string;
}
