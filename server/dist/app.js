"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puppy_1 = require("./models/puppy");
const bodyParser = require('body-parser');
const cors = require('cors');
const PUPPIES = [
    { id: 123, breed: 'husky', name: 'Snow Man', birthDate: '21.09.1986', img: 'https://loremflickr.com/320/240/husky_puppy' },
    { id: 124, breed: 'sarabi', name: 'SAG', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/puppy' },
    { id: 125, breed: 'golden retriever', name: 'Goldi', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/goldenretriever' },
    { id: 126, breed: 'french bulldog', name: 'Martin', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/bull_dog_puppy' },
    { id: 127, breed: 'beagle', name: 'Peggy', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/beagle_dog' },
    { id: 128, breed: 'poodle', name: 'Teddy', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/poodle_puppy' },
    { id: 129, breed: 'golden retriever', name: 'Goli', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/golden_retriever' },
    { id: 130, breed: 'german shepherd', name: 'Rex', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/germanshepherd' },
    { id: 131, breed: 'afghan hound', name: 'Nikol', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/afghanhound' },
    { id: 132, breed: 'german shepherd', name: 'Nina', birthDate: '21.09.1983', img: 'https://loremflickr.com/320/240/frenchbulldog' },
];
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type',],
}));
app.get('/api/puppies', cors(), (_req, res) => {
    return res
        .status(200)
        .json({ puppies: PUPPIES });
});
app.get('/api/puppies/:id', cors(), (_req, res) => {
    const puppyId = +(_req.params.id);
    const puppyIndex = PUPPIES.findIndex(puppy => puppy.id === puppyId);
    if (puppyIndex === -1) {
        throw new Error('puppy missing');
    }
    const puppyInfo = PUPPIES[puppyIndex];
    return res.status(200).json({ puppy: puppyInfo });
});
app.post('/api/puppies', cors(), (_req, res) => {
    const { name, breed, birthDate, img } = _req.body;
    const newPuppy = new puppy_1.Puppy(Date.now(), breed, name, birthDate, img);
    PUPPIES.push(newPuppy);
    return res.status(201).json({ message: 'new puppy added', puppies: PUPPIES });
});
app.put('/api/puppies/:id', cors(), (_req, res) => {
    const puppyId = +(_req.params.id);
    const updatedName = _req.body.name;
    const updatedBreed = _req.body.breed;
    const updatedBd = _req.body.birthDate;
    const img = _req.body.img;
    const puppyIndex = PUPPIES.findIndex(puppy => puppy.id === puppyId);
    if (puppyIndex === -1) {
        throw new Error('puppy not found');
    }
    PUPPIES[puppyIndex] = new puppy_1.Puppy(puppyId, updatedBreed, updatedName, updatedBd, img);
    res.status(200).json({ message: ' updated', updatePuppy: PUPPIES[puppyIndex] });
});
app.delete('/api/puppies/:id', cors(), (_req, res) => {
    const puppyId = +(_req.params.id);
    const puppyIndex = PUPPIES.findIndex(puppy => puppy.id === puppyId);
    if (puppyIndex === -1) {
        throw new Error('puppy not found');
    }
    PUPPIES.splice(puppyIndex, 1);
    res.status(200).json({ message: ' puppy deleted' });
});
exports.default = app;
//# sourceMappingURL=app.js.map