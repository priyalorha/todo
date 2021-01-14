import axios from 'axios';
import { apiUrl } from './config';


export const getLocation = async(radius,latitude,longitude) =>
{
    try{
        const response = await axios({
            url: `${apiUrl}/location/${radius}/${latitude}/${longitude}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
            }

        
        localStorage.setItem("priya",`<div class="table-light">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>latitude</th>
              <th>longitude</th>
            </tr>
          </thead>
          <tbody>
          ${response.data.data
            .map(
              (listElement) => `
          <tr>
            <td>${listElement.id}</td>
            <td>${listElement.name}</td>
            <td>${listElement.location[0]}</td>
            <td>${listElement.location[1]}</td> d
            </td>
          </tr>
          `
            )
            .join('\n')}
        </tbody>
      </table>
         </div>`)
         
        
    } 
    catch (err) {
      console.log( err)
      return [];
    }
  };
