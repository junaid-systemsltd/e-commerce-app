import { Observable } from 'rxjs';

const ObservableHandler = {
  errorHandler: (observable: Observable<any>, instance: any) => {
    observable.subscribe((error) => {
      instance.error = error;
    });
  },

  loadingHandler: (observable: Observable<any>, instance: any) => {
    observable.subscribe((loading) => {
      instance.loading = loading;
    });
  },
};

export default ObservableHandler;
