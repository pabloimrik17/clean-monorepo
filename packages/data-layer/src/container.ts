import { Container } from "inversify";
import { add, Add } from "./add.js";

export const dataTypes = {
    Add: Symbol.for("Add"),
};

export const dataContainer = new Container();

dataContainer.bind<Add>(dataTypes.Add).toConstantValue(add);
