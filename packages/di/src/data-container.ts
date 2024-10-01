import {
    EventImplRepository,
    EventRemoteDatasource,
    NotARealHttpClient,
    ReservationImplRepository,
    ReservationRemoteDatasource,
    UserImplRepository,
    UserRemoteDataSource,
} from "@repo/data-layer";
import {
    EventDatasource,
    EventRepository,
    HttpClient,
    ReservationDatasource,
    ReservationRepository,
    UserDatasource,
    UserRepository,
} from "@repo/domain-layer";
import { Container } from "inversify";

export const dataContainer = new Container();

// Repositories
dataContainer.bind<EventRepository>("EventRepository").to(EventImplRepository);
dataContainer
    .bind<ReservationRepository>("ReservationRepository")
    .to(ReservationImplRepository);
dataContainer.bind<UserRepository>("UserRepository").to(UserImplRepository);

// Datasources
dataContainer
    .bind<EventDatasource>("EventDatasource")
    .to(EventRemoteDatasource);
dataContainer
    .bind<ReservationDatasource>("ReservationDatasource")
    .to(ReservationRemoteDatasource);
dataContainer.bind<UserDatasource>("UserDatasource").to(UserRemoteDataSource);

// Infra
dataContainer.bind<HttpClient>("HttpClient").to(NotARealHttpClient);
