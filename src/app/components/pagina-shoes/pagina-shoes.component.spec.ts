import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaShoesComponent } from './pagina-shoes.component';

describe('PaginaShoesComponent', () => {
  let component: PaginaShoesComponent;
  let fixture: ComponentFixture<PaginaShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaShoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
