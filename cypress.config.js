import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:80",
        env: {
            backendBaseUrl: "http://localhost:80/api",
            rootUser: {
                email: "a.gosens@student.fontys.nl",
                password: "Qwerty123!"
            },
        },
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    }
});