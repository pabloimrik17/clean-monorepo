import {
    EventFrontendRepository,
    EventRemoteDatasource,
    NotARealHttpClient,
    ReservationFrontendRepository,
    ReservationRemoteDatasource,
    UserFrontendRepository,
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

// Frontend
export const dataFrontendContainer = new Container();

// Repositories
dataFrontendContainer
    .bind<EventRepository>("EventRepository")
    .to(EventFrontendRepository);
dataFrontendContainer
    .bind<ReservationRepository>("ReservationRepository")
    .to(ReservationFrontendRepository);
dataFrontendContainer
    .bind<UserRepository>("UserRepository")
    .to(UserFrontendRepository);

// Datasources
dataFrontendContainer
    .bind<EventDatasource>("EventDatasource")
    .to(EventRemoteDatasource);
dataFrontendContainer
    .bind<ReservationDatasource>("ReservationDatasource")
    .to(ReservationRemoteDatasource);
dataFrontendContainer
    .bind<UserDatasource>("UserDatasource")
    .to(UserRemoteDataSource);

// Infra
dataFrontendContainer.bind<HttpClient>("HttpClient").to(NotARealHttpClient);
