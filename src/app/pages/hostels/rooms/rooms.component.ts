import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingStateService } from 'src/app/loading-state.service';
import { YctServiceService } from 'src/app/yct-service.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: any = []
  hostels: any = []
  hostel = null
  room = ''
  id = null
  editedRoom: any = {}

  constructor(private yctService: YctServiceService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingStateService) { }

  ngOnInit(): void {
    this.getHostels()
    this.getRooms()
  }

  getHostels() {
    this.yctService.getHostels().subscribe({
      next: (data: any) => {
        console.log('Hostel: ', data)
        this.hostels = data?.results
      },
      error: (err) => {
        console.log('Hostel Err: ', err);
      }
    })
  }

  getRooms() {
    this.yctService.getRooms().subscribe({
      next: (data: any) => {
        console.log('Rooms: ', data)
        this.rooms = data?.results
      },
      error: (err) => {
        console.log('Roomms Err: ', err);
      }
    })
  }

  addRoom() {

    if(!this.hostel && !this.room) {
      this.toastr.info('Please fill in the field')
      return
    }

    this.loadingService.showLoading()
    const body = {
      hostel: this.hostel,
      name: this.room
    }

    if(this.id) {
      this.editedRoom.hostel = this.hostel
      this.yctService.updateRoom(this.editedRoom).subscribe({
        next: (data) => {
          this.loadingService.hideLoading()
          console.log('Hostel: ', data);
          this.id = null
          this.toastr.success('Room Updated Successfully')
          this.getRooms()
        },
        error: (err) => {
          this.id = null
          this.loadingService.hideLoading()
          console.log('update Hostel Err: ', err);
        }
      })
    } else {
      this.yctService.createRoom(body).subscribe({
        next: (data) => {
          this.loadingService.hideLoading()
          console.log('Hostel: ', data);
          this.toastr.success('Room Created Successfully')
          this.getRooms()
        },
        error: (err) => {
          this.loadingService.hideLoading()
          console.log('Hostel Err: ', err);
        }
      })

    }
   
  }

  editRoom(room: any) {  
    this.id = room?.id
    this.editedRoom = room
  }

  deleteRoom(id: number) {
    const shouldDelete = confirm('Are you sure you want to delete this room?')

    if(shouldDelete) {
      this.loadingService.showLoading()
      this.yctService.deleteRoom(id).subscribe({
        next: () => {
          this.toastr.info('Room Deleted')
          this.loadingService.hideLoading()
          this.getRooms()
        },
        error: (err) => {
          console.log('Student Register Err: ', err);
          this.loadingService.hideLoading()
        }
      })
    }
  }

  selectHostel(ev: any) {
    console.log('Host: ', ev.target.value);
    this.hostel = ev.target.value
  }

}
