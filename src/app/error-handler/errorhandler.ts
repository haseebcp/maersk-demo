import { ErrorHandler, Inject, Injectable, Injector, NgZone } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ApiService } from "../services/api.service";

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
    constructor(@Inject(Injector) private readonly injector: Injector,
    private zone:NgZone,
    private loaderService: NgxUiLoaderService,
    private apiService: ApiService
    ) { }

    private get toastService() {
        return this.injector.get(ToastrService);
    }

    handleError(error) {
        this.zone.run(() => this.toastService.error(error.message));
        this.loaderService.stopAll();
        this.apiService.isLodingSubect.next(false);

    }
}