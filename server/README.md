<br />
<div align="center">
  <a href="https://github.com/natashapettinger/myttb-server">
    <img src="logo.png" alt="Logo" width="180" height="180">
  </a>

<h3 align="center">myTTB</h3>

  <p align="center">
    Software to help small distilleries manage inventory, record manufacturing data, optimize yields, and fill out federal reporting paperwork.
    <br />
    <a href="https://github.com/natashapettinger/myttb-server/wiki/user-flow"><strong>User Flow in Wiki »</strong></a>
    <br />
    <br />
    <a href="https://github.com/natashapettinger/myttb-server">View Demo</a>
    ·
    <a href="https://github.com/natashapettinger/myttb-server/issues">Report Bug</a>
    ·
    <a href="https://github.com/natashapettinger/myttb-server/issues">Request Feature</a>
    ·
    <a href="https://github.com/natashapettinger/myttb-client/">Frontend Repo</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Built With</a></li>
        <li><a href="#demo">Demo</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#run-locally">Run Locally</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#lessons-learned">Lessons Learned</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#legal">Legal</a></li>
  </ol>
</details>

## About the Project

Keeping track of your spirits manufacturing is a lot of work! This is the backend of a web app that records the data on your 
* 🌾 raw materials inventories
* 🛁 ferments
* 🥃 distillations
* 🛢 warehouse operations
* 📦 processing operations
* and more 


that are necessary to make filling out your monthly TTB reports a breeze 🍃. Built for distilleries who are just starting out and cannot afford the $400+ per month of subscription of popular paid solutions. Combine this with the React-based front end found [here](https://github.com/NatashaPettinger/) or build your own!

### Tech Stack

Client:
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

Server:
* [![Node][Node.js]][Node-url]
* [![Express][Express.com]][Express-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]


Dependencies: ```dotenv```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Demo
[myTTB](https://#)
```
To avoid signing up, you may log in with the following credentials:
- Email: WeLikeWhiskey@gmail.com
- Password: drinkwhiskey!1234
```
Not all functionality is available in the demo. All pages will be viewable, but form submissions will not lead to changes in the database.


### Features
* Secure login with Passport Auth
* TTB form templating

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have node installed in order to run the back end.

  ```bash
    npm install npm@latest -g
  ```


### Run Locally
1. Clone the project
  ```bash
    git clone https://github.com/natashapettinger/myttb-server.git
  ```

2. Go to the project server directory and install dependencies
  ```bash
    cd myTTB/server
    npm install
  ```

3. If using the associated front-end, clone the [client repo](https://github.com/NatashaPettinger/myttb-client).
  ```bash
    git clone https://github.com/natashapettinger/myttb-client.git
  ```

4. Navigate to the project client directory and install dependencies
  ```bash
    cd ../client
    npm install
  ```

5. Make sure you have your [environment variables](#environment-variables) saved in your `.env` file.

6. Start the client and server

    a) With nodemon
    ```bash
      npm run dev
    ```

    b) With node
    ```bash
      npm run start
    ```

7. Navigate to the local host port that the client is running on in your browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in `/config/.env`

`PORT: <port>` (can be any port, ex: 3000, but must be different than the port that the frontend is set to)

`DB_STRING: <your database uri>`

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap


- [ ] Home:
  - [ ] Make temperature/proof table and enter into database
  - [ ] Yield analysis
- [ ] Raw Materials Page:
  - [x] ~~Edit capabilities for raw materials~~
  - [ ] Bulk data upload for raw materials backend so you can receive full order at once
- [ ] Production Page:
  - [ ] Yield analysis
  - [ ] Edit capabilities for ferment log
  - [ ] Edit capabilities for mash steps 
  - [ ] Add analysis for mash steps - heating, cooling, hold at temp durations
  - [ ] Bulk data upload
  - [ ] Add redistillation option for spirits in warehousing
- [ ] Warehousing Page:
    - [ ] Edit capabilities for warehouse tanks
- [ ] Processing Page:
    - [ ] Connect raw materials database to processing
    - [ ] Add cost analysis in to processing
- [ ] TTB Reporting
  - [ ] Backend for production operations form
    - [ ] Operations form table
    - [ ] List of available months
    - [ ] Process month form 
  - [ ] Backend for warehousing operations form
    - [ ] Operations form table
    - [ ] List of available months
    - [ ] Process month form
  - [ ] Backend for processing operations form
    - [ ] Operations form table
    - [ ] List of available months
    - [ ] Process month form
  - [ ] Lowest Priority: Backend for processing (denaturing) operations form
    - [ ] Operations form table
    - [ ] List of available months
    - [ ] Process month form  
- [ ] General:
  - [x] ~~Working frontend for raw materials, production, warehousing, and processing~~
  - [ ] Refactor & clean up folders
  - [ ] Increase readability of controllers
  - [ ] Add cleaning schedule/process backend
    - [ ] Cleaning Model
    - [ ] Integrate backend w/ raw materials cleaning products
  - [ ] Add finished goods backend that tracks how much of each batch is left, where each batch goes, etc.
  - [ ] Figure out how to make dates input into the database in local time
- [x] ~~Working models for raw materials, production, warehousing, and processing~~

  

See the [open issues](https://github.com/natashapettinger/myttb-server/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Lessons Learned
🌱 There will always be time to refactor. Getting a working MVP is the priority.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Natasha Pettinger - [LinkedIn](https://www.linkedin.com/in/natasha-pettinger/) - [Website](https://npettinger.netlify.app/)

Project Link: [https://github.com/natashapettinger/myttb-client](https://github.com/natashapettinger/myttb-client)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgements

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Legal

This software is meant to make federal reporting easier, and is not meant to be a complete substitute for alcohol tracking and reporting. You are responsible for ensuring accuracy in your TTB reports. We take no responsibly for inaccurate reporting that may arise through the use of this software. 


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com