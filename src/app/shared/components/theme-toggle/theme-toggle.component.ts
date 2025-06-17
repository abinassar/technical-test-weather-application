import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ThemeToggleService } from "@core/services";

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ThemeToggleComponent implements OnInit {

  iconPath: string = "";
  moonPath: string = "assets/icons/moon.svg";
  sunPath: string = "assets/icons/sun.svg";

  constructor(private themeToggleService: ThemeToggleService) {}

  toggle() {
    this.iconPath = (this.iconPath === this.moonPath) ? this.sunPath : this.moonPath;
    this.themeToggleService.toggleMode();
  }

  ngOnInit(): void {
    if (localStorage.getItem('mode')) {
      this.iconPath = (localStorage.getItem('mode') === 'dark') ? this.moonPath: this.sunPath;
    }
  }
}
