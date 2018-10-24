import { Component, OnInit } from '@angular/core';
import { PersonasViewModelService } from './personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  constructor(private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  ngOnInit() {
    this.vm.list();
  }
}

@Component({
  selector: 'app-personas-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasListComponent implements OnInit {
  constructor(private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  ngOnInit() {
  }
}
@Component({
  selector: 'app-personas-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasAddComponent implements OnInit {
  constructor(private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  ngOnInit() {
  }
}
@Component({
  selector: 'app-personas-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasEditComponent implements OnInit {
  constructor(private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  ngOnInit() {
  }
}
@Component({
  selector: 'app-personas-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasViewComponent implements OnInit {
  constructor(private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  ngOnInit() {
  }
}

export const PERSONAS_COMPONENT = [PersonasComponent, PersonasListComponent,
  PersonasAddComponent, PersonasEditComponent, PersonasViewComponent];
