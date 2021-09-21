import supertest from "supertest";
import chai from "chai";
import app from "./index.js";

const expect = chai.expect;

const request = supertest(app);

describe("Test API", () => {

    let product;

    describe("POST /productos/guardar", () => {
        it("Should return status code: 200", async () => {
            let response = await request.post("/api/productos/guardar").send({ "title": "producto desde graphql", "thumbnail": "graphql.jpg", "price": 100});
            product = response.body;
            expect(response.status).to.eql(200);
        });

        it("Should return list", async () => {
            let response = await request.post("/api/productos/guardar").send({ "title": "producto desde graphql", "thumbnail": "graphql.jpg", "price": 100});
            expect(typeof response.body).to.eql("object");
        });
    });

    describe("GET /productos/listar", () => {
        it("Should return status code: 200", async () => {
            let response = await request.get("/api/productos/listar");
            expect(response.status).to.eql(200);
        });

        it("Should return list", async () => {
            let response = await request.get("/api/productos/listar");
            product = response.body[0];
            expect(typeof response.body).to.eql("object");
        });
    });

    describe("GET /productos/listar/:id", () => {
        it("Should return status code: 200", async () => {
            let response = await request.get(`/api/productos/listar/${product._id}`);
            expect(response.status).to.eql(200);
        });

        it("Should return list", async () => {
            let response = await request.get(`/api/productos/listar/${product._id}`);
            expect(typeof response.body).to.eql("object");
        });
    });

    describe("PUT /productos/actualizar/:id", () => {
        it("Should return status code: 200", async () => {
            let response = await request.put(`/api/productos/actualizar/${product._id}`, { title: "cambio de titulo", thumbnail: "graphql.jpg", price: 100,});
            expect(response.status).to.eql(200);
        });

        it("Should return list", async () => {
            let response = await request.put(`/api/productos/actualizar/${product._id}`, { title: "cambio de titulo", thumbnail: "graphql.jpg", price: 100,});
            expect(typeof response.body).to.eql("object");
        });
    });

    describe("DELETE /productos/borrar/:id", () => {
        it("Should return status code: 200", async () => {
            let response = await request.delete(`/api/productos/borrar/${product._id}`);
            expect(response.status).to.eql(200);
        });

        it("Should return list", async () => {
            let response = await request.delete(`/api/productos/borrar/${product._id}`);
            expect(typeof response.body).to.eql("object");
        });
    });
});