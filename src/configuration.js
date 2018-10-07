const development = {
    apiGateway: {
        URL: "http://localhost:8000/api"
    }
};

const staged = {
    apiGateway: {
        URL: "http://staging.api.todo.abidtokee.gq/api"
    }
};

const production = {
    apiGateway: {
        URL: "http://api.todo.abidtokee.gq/api"
    }
};

let configuration = null;

switch (process.env.REACT_APP_STAGE) {
    case 'staged':
        configuration = staged;
        break;
    case 'production':
        configuration = production;
        break;
    default:
        configuration = development;
}

export default configuration;