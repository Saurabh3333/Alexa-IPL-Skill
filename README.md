## About
### What is an Amazon-Alexa Skill?

[![Greenkeeper badge](https://badges.greenkeeper.io/Saurabh3333/Alexa-IPL-Skill.svg)](https://greenkeeper.io/)
Alexa is Amazon’s `voice service` and the brain behind tens of millions of devices like the Amazon Echo, Echo Dot, and Echo Show. Alexa provides capabilities, or skills, that enable customers to create a more personalized experience. It is capable of voice interaction, music playback, making to-do lists, setting alarms, streaming podcasts, playing audiobooks, and providing weather, traffic, and other real-time information, such as news. Alexa can also control several smart devices using itself as a home automation system. Users can extend the Alexa capabilities by installing "skills" (additional functionality developed by third-party vendors, in other settings more commonly called apps).  

### What does this project have?
* This project is based on the custom alexa skills that have been created on scanning and querying the IPL dataset (https://www.kaggle.com/manasgarg/ipl/data). The dataset consists of statistical analysis of all the matches ever played in the IPL upto season 10 (2017). In the project the custom skills have been programmed using the `node express` framework. The user requires an alexa enabled device like Amazon Echo, Echo Dot and Echo Show to interact with the skill.
* The project also contains a cross platform mobile app based on the `react-native` framework. This app contains a log of defined intents, their utterances and the respective response alexa will give. This app can serve as a companion for the user to effectively interact with `alexa`.

### Link to mobile app
* The link to the mobile app can be found here. [IPLAlexaSkill](https://drive.google.com/drive/folders/1cqYim39u2zC1iGJBKR_SiDwv3Senu1X6).
* Follow the steps to get it running on your device: [get the steps to setup here](https://github.com/anishsamant/IPLAlexaSkill/blob/master/README.md).
_________________________________________________________________________________________________________________________________________________________
## Deployment Instructions
Any project on hasura.io/hub can be cloned and deployed. In fact, this alexa-ipl-skill is a hasura project itself.

**Step 1:** Install the hasura CLI: [installation instructions](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)

**Step 2:** Create a hasura project on your machine

```
$ # 1) Run the quickstart command
$ hasura quickstart anishsamant/alexa-ipl-skill
```

**Step 3:** Deploy the project to your free cluster!

```
$ # 2) Git add, commit & push to deploy to your cluster
$ cd alexa-ipl-skill
$ git add . && git commit -m 'First commit'
$ git push hasura master
```

**Note**: Your free cluster got automatically created when you ran the `quickstart` command.

### What got 'deployed'?

This `alexa-ipl-skill` project contains a sample data schema and some sample data (files in `migrations`) and a simple microservice in nodejs (`microservices/www`). When you ran the `git push` these tables and a microservice and even a subdomain to access your microservice all
got created.

In the next few steps you'll be browsing the instant Hasura APIs and exploring the custom microservice too.

### Using the API console

The hasura CLI gives you a web UI to manage your data modelling, manage your app users and explore the Hasura APIs.
The API explorer gives you a collection of all the Hasura APIs and lets you test them easily.

Access the **api-console** via the following command:

```
$ hasura api-console
```

This will open up Console UI on the browser. You can access it at [http://localhost:9695](http://localhost:9695).  
You can know more about the hasura cli [here](https://docs.hasura.io/0.15/manual/hasuractl/index.html).

_________________________________________________________________________________________________________________________________________________________
## How to test out the skill
### Workflow
* You can test out this skill using an Amazon Echo device or at [Echosim](https://echosim.io/welcome) (Web Browser) or at [Reverb](https://reverb.ai/) (Android/iOS). The workflow is as follows:
* You invoke the skill saying **"Alexa, start IPL Search"**.  
Currently we have 5 types of queries that can be invoked  
**1. About IPL:**  
sample invocation - `What is Indian Premier League`  
**2. Total Matches:**  
sample invocation - `What is the total number of matches played ever in IPL`   
**3. Season Winner:**  
sample invocation - `Who was the winner of IPL season 2017`  
**4. Welcome message:**  
sample invocation - `hello`  
**5. Exit:**  
sample invocation - `close alexa ipl skill`

**Note:** We will iteratively add more intents to the skills, which will be introduced in later releases.

### Follow the steps to get your sample skill running.
1. Go to [Amazon developer console](https://developer.amazon.com/edw/home.html#/skills).

2. Login with your **amazon credentials** and select the `ALEXA` **Tab** on top.

3. Click on `Get Started >` for **Alexa Skills Kit**.

![getStarted](https://user-images.githubusercontent.com/21247634/36897778-f57725aa-1e3d-11e8-9d64-0dcb27673bc9.jpg).
  
4. Click on `Add a New Skill`.

![addNewSkill](https://user-images.githubusercontent.com/21247634/36897779-f5acf892-1e3d-11e8-9348-ba45dd50e1a0.jpg)
  
5. Call the skill `IPL search` and give the name as `ipl search`.

![invocationName](https://user-images.githubusercontent.com/21247634/36897780-f5e89028-1e3d-11e8-95cf-555ca07d7494.jpg)

**Note**  You can give any name. We have given **ipl search** for our skill.

**Click Next.**  
6. In the interaction model go to **</> Code Editor** and paste the below intent schema.

```
{
  "languageModel": {
    "intents": [
      {
        "name": "AMAZON.CancelIntent",
        "samples": []
      },
      {
        "name": "AMAZON.HelpIntent",
        "samples": []
      },
      {
        "name": "AMAZON.StopIntent",
        "samples": []
      },
      {
        "name": "helloIntent",
        "samples": [
          "say hello",
          "hello",
          "hi"
        ],
        "slots": []
      },
      {
        "name": "iplDefinitionIntent",
        "samples": [
          "what is indian premier league",
          "what is ipl",
          "what this skill is all about"
        ],
        "slots": []
      },
      {
        "name": "iplFinalWinner",
        "samples": [
          "Who won ipl season {season}",
          "Who was the winner of ipl season {season}"
        ],
        "slots": [
          {
            "name": "season",
            "type": "AMAZON.NUMBER"
          }
        ]
      },
      {
        "name": "iplTotalMatches",
        "samples": [
          "what is the total number of matches played ever in IPL",
          "what is the total number of matches played ever in indian premier league",
          "how many matches played by teams in ipl",
          "what is the total number of matches played in IPL"
        ],
        "slots": []
      },
      {
        "name": "thanksIntent",
        "samples": [
          "goodbye",
          "bye",
          "tata",
          "stop",
          "thanks",
          "exit",
          "close",
          "close alexa ipl skill",
          "quit",
          "shutdown"
        ],
        "slots": []
      }
    ],
    "invocationName": "ipl search"
  }
}

```

**Note**  You can define your own intents.

7. Click on `Apply Changes` and click the `Build Model` button.

8. Under `Configuration` section, for the service endpoint, check the HTTPS radio button.  
Put the default URL as `https://www.<cluster-name>.hasura-app.io/ipl.`   
(Run `$ hasura cluster status` from root directory to know your cluster name).

![endpoint](https://user-images.githubusercontent.com/21247634/36897781-f640ba50-1e3d-11e8-933b-1856af0ecfa6.jpg)

**Click next.**
  
9. About SSL certificates, Hasura services have auto generated LetsEncrypt Grade A SSL certificates. This means, you have to check the radio button that says **My development endpoint has a certificate from a trusted certificate authority.**  
**Click next.**
  
10. And you are done. You can test your skills in the `Test` section.

### Internal Implementation
This skill is written in Node Express. The Implementation is as follows:
* When you make a particular type of query, an appropriate intent from the skill set is invoked and then the relevant method mapped to that intent is called from the node express script, which fetches the results from the matches database. A response string is generated using fetched data, which is spoken out by Alexa.
* If Alexa is not able to recognise the spoken words or if there exists no results based on the parameters passed, Alexa will humbly respond and ask you to try again.

_________________________________________________________________________________________________________________________________________________________
## React Native App

![logo](https://user-images.githubusercontent.com/21247634/36923254-ae754c9c-1e90-11e8-8135-c50253e77d85.jpeg)

### Important Links

1. **Github Project:-**  http://github.com/anishsamant/IPLAlexaSkill
2. **.apk file:-** [IPLAlexaSkill](https://drive.google.com/drive/folders/1cqYim39u2zC1iGJBKR_SiDwv3Senu1X6)  
   **(keep coming back for new version. Current: 03/03/2018)**

### ABOUT THE APP

The app is based on the custom alexa skills that have been created on scanning and querying the IPL dataset (https://www.kaggle.com/manasgarg/ipl/data). The dataset consists of statistical analysis of all the matches ever played in the IPL upto season 10 (2017). This mobile app shows a <b>list of defined intents, their utterances and the respective response that alexa will give</b>. Currently there are 5 intents defined and the app provides the valid utterances for each one of them. This app works as a guide for the user to effectively interact with the alexa enabled device.<p>
	
### Intents
Currently 5 intents have been defined:

1. Welcome Message
2. About IPL
3. Total Matches Played
4. Season Winner
5. Exit message
	
### Steps to set up development environment

	-- Follow the steps as mentioned in "Getting Started" section of react-native website in the "Build with native code" tab
	-- https://facebook.github.io/react-native/docs/getting-started.html

### To Clone Repository and Running on device/emulator

```
$ git clone https://github.com/anishsamant/IPLAlexaSkill	
$ cd IPLAlexaSkill
$ npm install
$ # (for android)
$ react-native run-android 
        OR
$ # (for ios)
$ react-native run-ios
$ # This will run the app on your connected emulator or development device
```
	
### Screenshots

![home](https://user-images.githubusercontent.com/21247634/36922877-6bf3e7f8-1e8f-11e8-933a-450e47d12e25.png)
&emsp;
![intents](https://user-images.githubusercontent.com/21247634/36922914-8d67acee-1e8f-11e8-8a1a-2b13c84696f6.png)
&emsp;
![welcome](https://user-images.githubusercontent.com/21247634/36922918-8e44fb1c-1e8f-11e8-9414-f6d4ec641870.png)  
&nbsp;  
&nbsp;  
![about](https://user-images.githubusercontent.com/21247634/36922919-8e777060-1e8f-11e8-9c10-37c57b18817d.png)
&emsp;
![totalmatches](https://user-images.githubusercontent.com/21247634/36922917-8e11fae6-1e8f-11e8-88da-18bcb74c69ab.png)
&emsp;
![seasonwinner](https://user-images.githubusercontent.com/21247634/36922916-8ddabb8a-1e8f-11e8-9a0b-91884e9a9f70.png)

	
### Internal Implementation

1. The skill is invoked by saying **"Alexa, start IPL search"**.
2. If the asked question matches with the defined utterances, Alexa will give the respective response.
3. What is Indian Premier League  
Response: The Indian Premier League (IPL), officially Vivo Indian Premier League for sponsorship reasons, is a professional Twenty20 cricket league in India contested during April and May of every year by teams representing Indian cities.
	
### Support

&emsp;If you happen to get stuck anywhere, please mail us at <anish.samant97@gmail.com> or <saurabh.friday@gmail.com>. Alternatively, if you find a bug, you can raise an issue [here](https://github.com/anishsamant/IPLAlexaSkill/issues).

_________________________________________________________________________________________________________________________________________________________
## Support
&emsp;If you happen to get stuck anywhere, please mail us at <saurabh.friday@gmail.com> or <anish.samant97@gmail.com>. Alternatively, if you find a bug, you can raise an issue [here](https://github.com/Saurabh3333/Alexa-IPL-Skill/issues).

_________________________________________________________________________________________________________________________________________________________
## Contributers
1. Saurabh Shubham
   * [Github](https://github.com/Saurabh3333)
   * [LinkedIn](https://www.linkedin.com/in/saurabh-shubham/)
   * [Twitter](https://twitter.com/iamsaurabh33)
2. Anish Samant
   * [Github](http://github.com/anishsamant)
   * [LinkedIn](https://www.linkedin.com/in/anish-samant-a03452146/)
   * [Twitter](https://twitter.com/anishsamant)

_________________________________________________________________________________________________________________________________________________________
