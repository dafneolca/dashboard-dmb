import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDService } from '../../services/id.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  faChevronRight = faChevronRight;
  faSearch = faSearch;

  // datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(
    private apiIdService: IDService,
    private modalService: NgbModal,
    private router: Router,
    // private paginator: MatPaginator,
    public datepipe: DatePipe,
  ) {
    // this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue' })
  }

  // displayIdInput: boolean = false; //ok

  displayAPIInput: boolean = false;

  displayAppInput: boolean = false; //ok

  apiIDs = []; //all data raw

  allData = []; //NEW FORMAT

  id: string;
  key: string;

  apiNEW: string;

  currentUser: string;

  currentAppKey: string;
  currentAppKeyInput: string;

  hasAdminRights: boolean;

  viewDetail: boolean = false;
  viewDetailOfId: string;


  searchInput: string = "";

  spinnerVisibility: boolean = true; //Spinner
  p: number = 1; //MODAL
  closeResult: string; //MODAL



  // NEW DATA FROM BELOW
  users = [];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  ngOnInit() {
    this.currentUser = this.apiIdService.getUser();
    this.id = "ID";
    this.currentAppKey = "App Key";




    this.checkValidity();
    setTimeout(() => {
      this.spinnerVisibility = false;
    }, 500);
  }

  checkValidity() {
    this.hasAdminRights = true;
    // if (!this.hasAdminRights) {
    //   this.router.navigateByUrl('/');
    // }
    this.getData();
  }

  getData() {
    this.apiIdService.getAllData().subscribe(
      data => {
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          this.users.push(data[i])
        }
        console.log(this.users)
      },
      err => console.log(err)
    );
  }

  onCancel() {
    console.log("display aPINPUT");
    this.displayAPIInput = false;
  }

  onClear() {
    this.searchInput = "";
  }

  // Display New ID Input Window
  addNewKeyDisplay() {
    this.displayAPIInput = !this.displayAPIInput;
  }

  submitNewAPI(newAPI) {
    let dateFormat = this.datepipe.transform(newAPI.value.validUntil, 'yyyy-MM-dd');
    console.log("date: ", dateFormat);
    newAPI.value.validUntil = dateFormat;
    if (newAPI.valid) {
      // this.updateAPIKeys(newAPI);
      // this.apiIdService.addAPI(newAPI.value).subscribe(
      //   (res: Response) => {
      //     console.log("submitted")
      //   },
      //   err => console.log(err)
      // );
      // this.displayAPIInput = false;
    }
  }

  updateAPIKeys(newAPI) {
    this.allData.push(newAPI.value)
  }

  addNewAppID(appID) {
    this.currentAppKeyInput = appID;
    if (this.displayAppInput && this.currentAppKeyInput !== appID) {
      this.displayAppInput = false;
    } else {
      this.displayAppInput = true;
    }
  }

  submitNewID(apiKey, newAppID) {
    console.log(apiKey)
    console.log(newAppID.value);
    this.displayAppInput = false;
    this.updateAppIDs(apiKey, newAppID.value)
    for (let i = 0; i < this.allData.length; i++) {
      // if (this.allData[i].apiKey === apiKey) {
      //   this.apiIdService.addAppID(apiKey, newAppID.value)
      //     .subscribe(res => console.log(res), err => console.log(err))
      // }
    }
  }

  updateAppIDs(apiKey, newAppID) {
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i].apiKey === apiKey) {
        this.allData[i].appIds.push(newAppID);
      }
    }
  }

  cancelNewIDSubmission() {
    console.log("new API Input - should be app?")
    this.displayAppInput = false;
    this.currentAppKeyInput = '';
  }

  deleteAPIKey(api) {
    for (var i = 0; i < this.allData.length; i++) {
      if (this.allData[i].apiKey === api) {
        this.allData.splice(i, 1);
        // this.apiIdService.deleteAPI(api)
        //   .subscribe(res => console.log(res), err => console.log(err));
      }
    }
  }

  deleteAppID(APIKey, appID) {
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i].apiKey === APIKey) {
        for (let j = 0; j < this.allData[i].appIds.length; j++) {
          if (this.allData[i].appIds[j] === appID) {
            this.allData[i].appIds.splice(j, 1);
          }
        }
      }
    }
    // this.apiIdService.deleteAppID(APIKey, appID).subscribe(
    //   res => console.log(res), err => console.log(err)
    // )
  }

  // MODAL Delete App ID
  openDeleteKeyModal(content, id) {
    this.id = id;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openDeleteAppIDModal(content, id, key) {
    this.id = id;
    this.key = key;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
