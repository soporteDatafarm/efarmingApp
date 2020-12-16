import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User} from '../models/user';
import { Storage } from '@ionic/storage';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [LoginService]
})
export class LoginPage implements OnInit {

  public user: User;
  public userToken: any;
  loading: any;

  constructor(
    public _loginService: LoginService,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController
  ) { 
    this.user = new User('robert.erazo@caficauca.com','1nf0d@t@','password');
    //this.user = new User ('','','password')
    this.userToken = null;
    //this.userToken = "TFgyJsHy8aROi1RoncllXjIt3c3LrcTUbAxIOssEOewE2_rhdfBCrxFCYp7zPyTk1t1eax0qzEteXtlakN2JIsL8QFkOSXdW9NhPZZdJsx4ildw04NQyVRBbcbTInh31KgKB61ZmsDSzuDLR4pltmnkKodzM1dkG50xow0V8w65umQ1I7ckTFd-eSbHyrd2-OsGh2OvUdEQdhdWX4YQbLDyv-4Vn9TgYdm9zUYynDT24mAFJI1X8poHvIkuuaFi5elzPoOtm8tHbbbhnrKptTltUFd27Jeaowj8xNgy9WylC89Pb4XpO0-QifG84hffu5DDBzFFnAh9EzPt9q-CAPc3VBsThbjIfIn97e7XkJvA";
  }

  ngOnInit() {
    this.storage.get('autori').then((val) => {
      if (val != null && val != undefined) {
        this.userToken = val;
        this.router.navigate(['dashboard']);
      }
    }).catch((err) => {
      console.error(err)
    })
    //this.storage.set('autori', this.userToken);
    //this.storage.clear();
  }

  onSubmit(){
    this.storage.remove('autori');
    this.presentLoading('Validando el acceso',10000);
    this._loginService.signIn(this.user).subscribe(
      data => {
        this.userToken = data.access_token;
        if(this.userToken != null){
          this.loading.dismiss();
          this.storage.set('autori', this.userToken);
          this.router.navigate(['dashboard']);
        }           
      },
      error => {
        console.log(error);
      }
    );
    //this.router.navigate(['dashboard']);
  }

  async presentLoading(message: string, duration: number) {
    this.loading = await this.loadingController.create({
      message,
      duration
    });
    return this.loading.present();
  }

}
