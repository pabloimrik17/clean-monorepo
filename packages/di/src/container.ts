import { Container } from "inversify";
import { dataFrontendContainer } from "./data-container.js";
import { domainContainer } from "./domain-container.js";

export const frontendContainer = Container.merge(
    domainContainer,
    dataFrontendContainer,
);

export const backendContainer = Container.merge(
    domainContainer,
    dataFrontendContainer,
);
