import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { PetService, Cats } from './pet.service';

describe('PetService', () => {
  let mockBackend: MockBackend;
  let petService: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        PetService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ]
    });

    mockBackend = TestBed.get(MockBackend);
    petService = TestBed.get(PetService);
  });

  it('should be created', inject([PetService], (service: PetService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the cats if the call is successful', async () => {
    const mockResponse = [
      {
        'gender': 'Male',
        'petNames': ['Tom', 'Bob', 'Rob']
      },
      {
        'gender': 'Female',
        'petNames': ['Lili']
      }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    petService.getCatsByOwnerGender().subscribe(cats => {
      expect(cats.length).toBe(4);
      expect(cats[0].gender).toEqual('Male');
      expect(cats[1].gender).toEqual('Female');
      expect(cats[0].petNames.length).toEqual(2);
      expect(cats[3].petNames.length).toEqual(1);
    });
  });

  it('should return the cats in alphabetical order', async() => {
    const mockResponse = [
      {
        gender: 'Male',
        petNames: ['Tom', 'Bob', 'Rob']
      },
      {
        gender: 'Female',
        petNames: ['Lili']
      }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    petService.getCatsByOwnerGender().subscribe(cats => {
      expect(cats[0].petNames[0]).toEqual('Bob');
      expect(cats[0].petNames[1]).toEqual('Rob');
      expect(cats[0].petNames[2]).toEqual('Tom');
    });
  });
});
