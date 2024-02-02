export const URL = 'https://84ef-177-131-167-75.ngrok-free.app/api/v1/'

async function get<D>(url: string, jwt?: string, contentType?: string) {
  const response = await fetch(`${URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType || 'application/json',
      authorization: jwt || null,
    },
  })

  if (!response.ok) {
    console.log('response', response.statusText)
  }

  const json = await response.json()

  return json as D
}

async function post<B, D>(url: string, body: B, jwt?: string) {
  let json: D | null = null

  await fetch(`${URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: jwt || null,
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      console.log('response', response.ok)

      if (!response.ok) {
        throw new Error('deu ruim')
      }

      return await response.json()
    })
    .then((data) => {
      json = data

      return json
    })
    .catch((error) => {
      console.log('error', JSON.stringify(error, null, 2))
    })

  return json as D
}

async function remove() {
  await fetch(`${URL}usuarios/andres.dosantosbritoamaral@gmail.com`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3d3dy56YWFsLmNvbS5ici8iLCJ1cG4iOiJnYWJyaWVscGVjQGdtYWlsLmNvbSIsImdyb3VwcyI6WyJOT1JNQUwiXSwiYmlydGhkYXRlIjoiMjAwMS0wNy0xMyIsImlhdCI6MTcwNjYxODU3MywiZXhwIjoxNzA3MjIzMzczLCJqdGkiOiIzYjE5ODY5YS0zMzUyLTQyYmMtOTMwYS01NDA0MmIzNmMzYjIifQ.eMpPQHmgLxgYrbUrE1JmdSEGOGunx6ANDgXg4SJRIPIGkimYxoHKshgsVJFMUWZiyDSKNweTa02dSDIhWTXyEvmOxlQ9jay65K2h2pnciaqE0mpZuPaDFJ9Dt3PTi_2r3iYr3casDSduGr2HRVqofidtx7JyO0DCBLOE1OX9BTlD862IhIwOYlqelgHHs3pT5G7dnbpLAn38Vr3VCSncLtj3_g3Mgsh3X38GvDOE_shNdW-2A4umUdhdmQXYCt7bb__ex9Yk56p0oZ_vGV2UyI8XteEFxc8PImtkMmkEY63--MxqYlmr55dR30GitMv3uP2BFXYLhx5YBu8HXEyo2w' ||
        null,
    },
  })

  // const json = await response.json()

  // return json
}

export const api = {
  get,
  post,
  remove,
}
