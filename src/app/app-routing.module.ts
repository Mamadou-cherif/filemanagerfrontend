import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AccueilAdminComponent } from './components/accueil-admin/accueil-admin.component';
import { AccueilServiceComponent } from './components/accueil-service/accueil-service.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ModifCategoriedocComponent } from './components/categoriedoc/modif-categoriedoc/modif-categoriedoc.component';
import { AjoutCategoriedocDocumentComponent } from './components/categoriedoc/onglets/document/ajout-categoriedoc-document/ajout-categoriedoc-document.component';
import { ModifCategoriedocDocumentComponent } from './components/categoriedoc/onglets/document/modif-categoriedoc-document/modif-categoriedoc-document.component';
import { FilemanagerComponent } from './components/filemanager/filemanager.component';
import { MyDocumentComponent } from './components/my-document/my-document.component';

import { UpdatePasswordComponent } from './components/password/update-password/update-password.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { ModifServiceComponent } from './components/sservices/modif-service/modif-service.component';
import { AjoutServiceCategoriedocComponent } from './components/sservices/ontlets/categoriedoc/ajout-service-categoriedoc/ajout-service-categoriedoc.component';
import { AjoutServiceDocumentComponent } from './components/sservices/ontlets/document/ajout-service-document/ajout-service-document.component';
import { ModifServiceDocumentComponent } from './components/sservices/ontlets/document/modif-service-document/modif-service-document.component';
import { AjoutUtilisateurServiceComponent } from './components/sservices/ontlets/user/ajout-utilisateur-service/ajout-utilisateur-service.component';
import { ModifUtilisateurServiceComponent } from './components/sservices/ontlets/user/modif-utilisateur-service/modif-utilisateur-service.component';
import { AjoutStructureComponent } from './components/structure/ajout-structure/ajout-structure.component';
import { ListeStructureComponent } from './components/structure/liste-structure/liste-structure.component';
import { ModifStructureComponent } from './components/structure/modif-structure/modif-structure.component';
import { AjoutStructureServiceComponent } from './components/structure/onglets/service/ajout-structure-service/ajout-structure-service.component';
import { ListeStructureServiceComponent } from './components/structure/onglets/service/liste-structure-service/liste-structure-service.component';
import { ModifStructureServiceComponent } from './components/structure/onglets/service/modif-structure-service/modif-structure-service.component';
import { AjoutStructureUserComponent } from './components/structure/onglets/user/ajout-structure-user/ajout-structure-user.component';
import { ListeStructureUserComponent } from './components/structure/onglets/user/liste-structure-user/liste-structure-user.component';
import { ModifStructureUserComponent } from './components/structure/onglets/user/modif-structure-user/modif-structure-user.component';

import { ListeUserComponent } from './components/user/liste-user/liste-user.component';
import { LoginComponent } from './components/user/login/login.component';
import { ModifUserComponent } from './components/user/modif-user/modif-user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    
    {path: "listeUser",canActivate:[AuthGuard], component: ListeUserComponent},
    {path: "formUser",canActivate:[AuthGuard], component: RegistrationComponent},
    {path: "modifUser/:id",canActivate:[AuthGuard], component: ModifUserComponent},
    {path: "login", component: LoginComponent},
    {path: "modifUserPassword", component: UpdatePasswordComponent},
    {
        path: "fileManager",
         canActivate:[AuthGuard],
        component: FilemanagerComponent,
        children: [
            {
                path: 'accueil', component: AccueilComponent,
            },
            {
                path: 'listeStructure', component: ListeStructureComponent,
            },
            {
                path: 'ajoutStructure', component: AjoutStructureComponent
            },
            {
                path: 'modifStructure/:id', component: ModifStructureComponent
            },

            {
                path: 'listeStructureService', component: ListeStructureServiceComponent,
            },
            {
                path: 'ajoutStructureService/:id', component: AjoutStructureServiceComponent
            },
            {
                path: 'modifStructureService/:id', component: ModifServiceComponent
            },
            
            {
                path: 'modifService/:id', component: ModifServiceComponent
            },

            {
                path: 'listeStructureUser', component: ListeStructureUserComponent,
            },
            {
                path: 'ajoutStructureUser/:id', component: AjoutStructureUserComponent
            },
            {
                path: 'modifStructureUser/:id', component: ModifStructureUserComponent
            },
            {
                path: 'ajoutServiceUser/:id', component: AjoutUtilisateurServiceComponent
            },
            {
                path: 'modifServiceUser/:id', component: ModifUtilisateurServiceComponent
            },
            {
                path: 'ajoutServiceCategorieDoc/:id', component: AjoutServiceCategoriedocComponent
            },
            {
                path: 'modifCategorieDoc/:id', component: ModifCategoriedocComponent
            },
            {
                path: 'modifCategorieDocDocument/:id', component: ModifCategoriedocDocumentComponent
            },
            {
                path: 'accueilService', component: AccueilServiceComponent
            },
            
            {
                path: 'ajoutServiceDocument/:id', component: AjoutServiceDocumentComponent
            },
            {
                path: 'modifServiceDocument/:id', component: ModifServiceDocumentComponent
            },

            {
                path: 'ajoutDocumentByCategorie/:id', component: AjoutCategoriedocDocumentComponent
            },
            
            {
                path: 'listeArchive/:id', component: ArchiveComponent
            },

            {
                path: 'rechercheDoc', component: RechercheComponent
            },
            {
                path: 'accueilAdmin', component: AccueilAdminComponent
            },
            {
                path: 'myDocument', component: MyDocumentComponent
            },
    ]
    },
    {path: '', redirectTo: '/login', pathMatch:'full'}
    
]



@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }