import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, finalize, throwError } from "rxjs";
import { ToasterService } from "./services/toaster.service";
import { LoaderService } from "./services/loader.service";

export function loggingInterceptor(req:HttpRequest<unknown>,next:HttpHandlerFn):Observable<HttpEvent<unknown>>{
    const token=localStorage.getItem("token");
    const route = inject(Router);
    const toaster=inject(ToasterService)
    const loader=inject(LoaderService) 
    req=req.clone({ setHeaders:{Authorization:`Bearer ${token}`}})
    loader.show()
    return next(req).pipe(catchError((err)=>{
        if(err instanceof HttpErrorResponse ){
        if(err.status===401){
            toaster.onShowToast("Unauthorized Access",'error')
            route.navigate(['login'])
        }  
        }
        return throwError(()=>new Error());
    }),
    
    finalize(() => {
        loader.hide();
    }));
}