import { Container } from "inversify";
import { dataContainer } from "./data-container.js";
import { domainContainer } from "./domain-container.js";

export const container = Container.merge(domainContainer, dataContainer);
