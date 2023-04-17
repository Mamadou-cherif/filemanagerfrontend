import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { AsideLeftComponent } from './components/aside-left/aside-left.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './services/shared.service';

import { DataTablesModule } from 'angular-datatables';

import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ListeUserComponent } from './components/user/liste-user/liste-user.component';
import { ModifUserComponent } from './components/user/modif-user/modif-user.component';
import { UpdatePasswordComponent } from './components/password/update-password/update-password.component';
import { AjoutStructureComponent } from './components/structure/ajout-structure/ajout-structure.component';
import { ModifStructureComponent } from './components/structure/modif-structure/modif-structure.component';
import { ListeStructureComponent } from './components/structure/liste-structure/liste-structure.component';
import { FilemanagerComponent } from './components/filemanager/filemanager.component';
import { StructureModifComponent } from './components/structure/onglets/details/structure-modif/structure-modif.component';
import { ModifStructureServiceComponent } from './components/structure/onglets/service/modif-structure-service/modif-structure-service.component';
import { AjoutStructureServiceComponent } from './components/structure/onglets/service/ajout-structure-service/ajout-structure-service.component';
import { ListeStructureServiceComponent } from './components/structure/onglets/service/liste-structure-service/liste-structure-service.component';
import { ListeStructureUserComponent } from './components/structure/onglets/user/liste-structure-user/liste-structure-user.component';
import { ModifStructureUserComponent } from './components/structure/onglets/user/modif-structure-user/modif-structure-user.component';
import { AjoutStructureUserComponent } from './components/structure/onglets/user/ajout-structure-user/ajout-structure-user.component';
import { ModifServiceComponent } from './components/sservices/modif-service/modif-service.component';
import { AjoutServiceDocumentComponent } from './components/sservices/ontlets/document/ajout-service-document/ajout-service-document.component';
import { ListeServiceDocumentComponent } from './components/sservices/ontlets/document/liste-service-document/liste-service-document.component';
import { ModifServiceDocumentComponent } from './components/sservices/ontlets/document/modif-service-document/modif-service-document.component';
import { ServiceModifComponent } from './components/sservices/ontlets/detail/service-modif/service-modif.component';
import { AjoutServiceCategoriedocComponent } from './components/sservices/ontlets/categoriedoc/ajout-service-categoriedoc/ajout-service-categoriedoc.component';
import { ListeServiceCategoriedocComponent } from './components/sservices/ontlets/categoriedoc/liste-service-categoriedoc/liste-service-categoriedoc.component';
import { ModifCategoriedocComponent } from './components/categoriedoc/modif-categoriedoc/modif-categoriedoc.component';
import { CategoriedocModifComponent } from './components/categoriedoc/onglets/detail/categoriedoc-modif/categoriedoc-modif.component';
import { AjoutCategoriedocDocumentComponent } from './components/categoriedoc/onglets/document/ajout-categoriedoc-document/ajout-categoriedoc-document.component';
import { ModifCategoriedocDocumentComponent } from './components/categoriedoc/onglets/document/modif-categoriedoc-document/modif-categoriedoc-document.component';
import { ListeCategoriedocDocumentComponent } from './components/categoriedoc/onglets/document/liste-categoriedoc-document/liste-categoriedoc-document.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { IconForRechercheComponent } from './components/icon-for-recherche/icon-for-recherche.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AjoutUtilisateurServiceComponent } from './components/sservices/ontlets/user/ajout-utilisateur-service/ajout-utilisateur-service.component';
import { ModifUtilisateurServiceComponent } from './components/sservices/ontlets/user/modif-utilisateur-service/modif-utilisateur-service.component';
import { ListeUtilisateurServiceComponent } from './components/sservices/ontlets/user/liste-utilisateur-service/liste-utilisateur-service.component';
import { AccueilServiceComponent } from './components/accueil-service/accueil-service.component';
import { AccueilAdminComponent } from './components/accueil-admin/accueil-admin.component';
import { MyDocumentComponent } from './components/my-document/my-document.component';


@NgModule({
  declarations: [
    AppComponent,
    AsideLeftComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    ListeUserComponent,
    ModifUserComponent,
    UpdatePasswordComponent,
    AjoutStructureComponent,
    ModifStructureComponent,
    ListeStructureComponent,
    FilemanagerComponent,
    StructureModifComponent,
    ModifStructureServiceComponent,
    AjoutStructureServiceComponent,
    ListeStructureServiceComponent,
    ListeStructureUserComponent,
    ModifStructureUserComponent,
    AjoutStructureUserComponent,
    ModifServiceComponent,
    AjoutServiceDocumentComponent,
    ListeServiceDocumentComponent,
    ModifServiceDocumentComponent,
    ServiceModifComponent,
    AjoutServiceCategoriedocComponent,
    ListeServiceCategoriedocComponent,
    ModifCategoriedocComponent,
    CategoriedocModifComponent,
    AjoutCategoriedocDocumentComponent,
    ModifCategoriedocDocumentComponent,
    ListeCategoriedocDocumentComponent,
    ArchiveComponent,
    RechercheComponent,
    IconForRechercheComponent,
    AccueilComponent,
    AjoutUtilisateurServiceComponent,
    ListeUtilisateurServiceComponent,
    ModifUtilisateurServiceComponent,
    AccueilServiceComponent,
    AccueilAdminComponent,
    MyDocumentComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
