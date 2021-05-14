import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/Settings';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(private flashMessage: FlashMessagesService,
    private settingsService: SettingsService,
    private router: Router) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('saved successfully!', {
      cssClass: 'alert-success', timeout: 3000 });
  }

}
