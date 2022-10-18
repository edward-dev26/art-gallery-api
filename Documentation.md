# Art Gallery API V1
## Resources
- /galleries
- /paintings
- /authors

## Endpoints
### Galleries

#### GET: /galleries
##### Query params

- limit
- offset

#### GET: /galleries/:id

#### POST: /galleries
##### Body

- name: string

#### PUT: /galleries/:id
##### Body

- name: string

#### DELETE: /galleries/:id

### Paintings

#### GET: /paintings
##### Query params

- gallery  (gallery id)
- limit
- offset

#### GET: /paintings/:id

#### POST: /paintings
##### Body

- name: string
- year: number
- author: authorId
- gallery: galleryId
- genre: realism | expressionism | impressionism | landscape | portrait
- technique: underpainting | sgraffito | glazing | stippling

#### PUT: /paintings/:id
##### Body

- name: string
- year: number
- author: authorId
- gallery: galleryId
- genre: realism | expressionism | impressionism | landscape | portrait
- technique: underpainting | sgraffito | glazing | stippling

#### DELETE: /paintings/:id

### Authors

#### GET: /authors
##### Query params

- limit
- offset

#### GET: /authors/:id

#### POST: /authors
##### Body

- firstname: string
- lastname: string

#### PUT: /authors/:id
##### Body

- firstname: string
- lastname: string

#### DELETE: /authors/:id


