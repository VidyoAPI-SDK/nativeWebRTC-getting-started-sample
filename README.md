
<!-- ABOUT THE PROJECT -->
# About The Project

Do you want to quickly add videoconferencing to your web page ? Are you looking for a solution that will "just work" in all desktop and mobile browsers without requiring users to install a plugin or download an app ?

This sample project showcases how you can do just that using Vidyo's state-of-the-art webRTC based javascript library. Just a few lines of code and you can host live meetings in your web page. 

This particular demo showcases the "hello world" equivalent of a videoconferencing solution. For a full featured version, check
https://github.com/VidyoAPI-SDK/nativeWebRTC-vidyoconnect-sample

<p align="right">(<a href="#top">back to top</a>)</p>

# Prerequisites

A local http server is needed to host the demo web page. Some simple options include 
* [http-server](https://www.npmjs.com/package/http-server)
* [http.server](https://docs.python.org/3/library/http.server.html)


<!-- HOW TO RUN THE DEMO -->
# How to run the demo

Do the following from a terminal window:

1. Clone the repo
   ```sh
   git clone https://github.com/VidyoAPI-SDK/nativeWebRTC-getting-started-sample.git

2. Navigate to the project directory
   
3. Install the http-server package using npm. (You can skip this step if you already have a http-server installed locally)
   ```sh
   npm install http-server -g
   ```
4. Start the http server
   ```sh
   http-server 
   ```  
 This will start a local http server. Note the URL, which is  usually  http://127.0.0.1:8080 or http://127.0.0.1:8081

5. Open the http server URL from the step above in your browser. In the browser pop-up, allow the  page access to audio and video.

![Alt text](allowMedia.png?raw=true)

6. Click the 'start call' button. This will start a video call in a private room. 

![Alt text](startCall.png?raw=true)


7. After a call is started, a meeting link and PIN are generated. This link and PIN can be shared with others who can join your call from their browser using the link.

![Alt text](meetingLink.png?raw=true)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
# License

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
# Contact

Email: support@vidyocloud.com

Company Link: https://www.vidyo.com/company/contact-vidyo

<p align="right">(<a href="#top">back to top</a>)</p>




