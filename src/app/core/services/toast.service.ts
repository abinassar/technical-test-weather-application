
import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastService {

    constructor(private snackBar: MatSnackBar,
                private translate: TranslateService
    ) {
        this.injectToastStyles(); // Inyecta los estilos al inicializar el servicio
    }

    private injectToastStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
        .toast,
        .toast-black-color {
        color: #ffffff;
        font-size: 14px;
        button {
            border: 1px solid #ffffff !important;
            color: #ffffff !important;
            margin-right: 10px !important;
            padding: 0px 11px !important;
            line-height: 27px !important;
            font-size: 11px !important;
        }
        }

        .error-mat-snack-bar-container {
            background: #950000 !important;
            color: #ffffff;
            font-size: 14px;
            button {
                border: 1px solid #ffffff !important;
                color: #ffffff !important;
                margin-right: 10px !important;
                padding: 0px 11px !important;
                line-height: 27px !important;
                font-size: 11px !important;
            }        
        }

        .success-mat-snack-bar-container {
            background-color: #4caf50 !important;
            color: #ffffff;
            font-size: 14px;
            button {
                border: 1px solid #ffffff !important;
                color: #ffffff !important;
                margin-right: 10px !important;
                padding: 0px 11px !important;
                line-height: 27px !important;
                font-size: 11px !important;
            }        
        }

        .warning-mat-snack-bar-container {
            background-color:rgb(213, 178, 19) !important;
            color: #ffffff;
            font-size: 14px;
            button {
                border: 1px solid #ffffff !important;
                color: #ffffff !important;
                margin-right: 10px !important;
                padding: 0px 11px !important;
                line-height: 27px !important;
                font-size: 11px !important;
            }        
        }
    `;
        document.head.appendChild(style);
    }

    get defaultConfig() {
        const config = new MatSnackBarConfig();
        config.horizontalPosition = 'start';
        config.verticalPosition = 'bottom';
        config.duration = 10000;
        config.panelClass = 'success-mat-snack-bar-container';
        return config;
    }

    get errorConfig() {
        const config = new MatSnackBarConfig();
        config.horizontalPosition = 'start';
        config.verticalPosition = 'bottom';
        config.duration = 10000;
        config.panelClass = 'error-mat-snack-bar-container';
        return config;
    }

    get warningConfig() {
        const config = new MatSnackBarConfig();
        config.horizontalPosition = 'start';
        config.verticalPosition = 'bottom';
        config.duration = 10000;
        config.panelClass = 'warning-mat-snack-bar-container';
        return config;
    }

    showToaster = (
        message: string,
        isError?: boolean,
        isOffline?: boolean,
        config: MatSnackBarConfig = isError
            ? this.errorConfig
            : isOffline
                ? this.warningConfig
                : this.defaultConfig
    ) => {
        /**
         * avoid showing toast if connection is offline, since
         * connection service handle toast message by itself
         */

        this.snackBar.open(this.translate.instant(message), 'OK', config);
    };

    success(
        message: string,
        config: MatSnackBarConfig = this.defaultConfig
    ) {
        this.snackBar.open(this.translate.instant(message), 'OK', config);
    };

    error(
        message: string,
        config: MatSnackBarConfig = this.errorConfig
    ) {
        this.snackBar.open(this.translate.instant(message), 'OK', config);
    };

    warning(
        message: string,
        config: MatSnackBarConfig = this.warningConfig
    ) {
        this.snackBar.open(this.translate.instant(message), 'OK', config);
    };

    dismiss = () => {
        this.snackBar.dismiss();
    };
}
