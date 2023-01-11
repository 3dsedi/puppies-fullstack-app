import express from 'express';
import { Request, Response, Application } from 'express';
import { Puppy } from './models/puppy';

const bodyParser = require('body-parser')
const cors = require('cors');

 const PUPPIES : Puppy[] =[
  {id: 123 , breed: 'husky', name:'snow man', birthDate:'21.09.1986'},
  {id: 124 , breed: 'sarabi', name:'SAG', birthDate:'21.09.1983'},
  {id: 125 , breed: 'golden retriever', name:'goldi', birthDate:'21.09.1983'},
  {id: 126 , breed: 'french bulldog', name:'martin', birthDate:'21.09.1983'},
  {id: 127 , breed: 'beagle', name:'peggy', birthDate:'21.09.1983'},
  {id: 128 , breed: 'poodle', name:'teddy', birthDate:'21.09.1983'},
  {id: 129 , breed: 'golden retriever', name:'golden hair', birthDate:'21.09.1983'},
  {id: 130 , breed: 'german shepherd', name:'rex', birthDate:'21.09.1983'},
  {id: 131 , breed: 'afghan hound', name:'nikol', birthDate:'21.09.1983'},
  {id: 132 , breed: 'german shepherd', name:'nina', birthDate:'21.09.1983'},
 ];

const app: Application = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  allowedHeaders: ['Content-Type',],
}));

app.get('/api/puppies',cors(), (_req: Request, res: Response) => {
  return res
  .status(200)
  .json({ puppies: PUPPIES });
});

app.get('/api/puppies/:id',cors(), (_req: Request, res: Response) => {
  const puppyId = +((_req.params as {id:string}).id)
  const puppyIndex = PUPPIES.findIndex(puppy => puppy.id === puppyId) 
  if(puppyIndex === -1){
    throw new Error ('puppy missing')
  }
  const puppyInfo = PUPPIES[puppyIndex]
  return res.status(200).json({puppy : puppyInfo})
});

app.post('/api/puppies',cors(), (_req: Request, res: Response) => {
  const {name,breed,birthDate} = _req.body;
  const newPuppy = new Puppy (Date.now(), breed, name, birthDate);
  PUPPIES.push(newPuppy);
  return res.status(201).json({message: 'new puppy added' , puppies: PUPPIES})
});

app.put('/api/puppies/:id',cors(), (_req: Request, res: Response) => {

  const puppyId = +((_req.params as {id: string}).id);
  const updatedName = (_req.body as { name: string }).name;
    const updatedBreed = (_req.body as { breed: string }).breed;
    const updatedBd = (_req.body as { birthDate: string }).birthDate;

  const puppyIndex = PUPPIES.findIndex(puppy=> puppy.id === puppyId);
  if (puppyIndex === -1){
    throw new Error ('puppy not found')
  }
  PUPPIES[puppyIndex] = new Puppy(puppyId, updatedBreed, updatedName,updatedBd);

  res.status(200).json({message: ' updated' , updatePuppy: PUPPIES[puppyIndex]})
});


app.delete('/api/puppies/:id',cors(), (_req: Request, res: Response) => {

  const puppyId = +((_req.params as {id: string}).id);

  const puppyIndex = PUPPIES.findIndex(puppy=> puppy.id === puppyId);
  if (puppyIndex === -1){
    throw new Error ('puppy not found')
  }
 PUPPIES.splice(puppyIndex, 1)

  res.status(200).json({message: ' puppy deleted'})
});

export default app;