# Guardian
![guard1](https://github.com/user-attachments/assets/f0231c91-bfc5-4349-a87f-e12e63568cfc)
Demo video:https://youtu.be/U3v-NOYGvrk?si=8SlsW2z0ElOQGWr9

## Inspiration 💡
The inspiration behind creating Guardian, a machine-learning-powered patient monitoring system, stemmed from both personal experience and an acute awareness of the growing crisis in the healthcare industry. With a projected shortfall of 151,000 caregivers by 2030—rising to an alarming 355,000 by 2040—the need for innovative solutions has never been more pressing. Our team has felt this challenge firsthand: Adon’s sister works in healthcare research, providing us with a clear view of the immense difficulties caregivers face in maintaining the quality of patient care.

On a more personal level, my father underwent heart surgery a few years ago. After being discharged from the hospital, he suffered a severe collapse at home due to complications with his medication. Luckily, we were present to intervene, but the incident raised a vital question: What happens to patients who are alone in such emergencies, without the immediate support of family or caretakers? This unsettling thought became the catalyst for Guardian, a system designed to bridge this gap, ensuring that patients and caregivers alike are better supported during moments of critical need.

## What it does 🚀
Guardian operates through two integrated components designed to streamline fall detection and patient care.

The first component is an automated Python script that continuously monitors patients for falls using advanced computer vision technology. When a fall is detected, Guardian takes a multi-step approach to ensure a comprehensive response. The system first engages with the patient through a smart assistant, asking if assistance is needed. This interaction is processed using speech-to-text technology, combined with sentiment analysis to assess if the patient is in distress. If emergency help is required, Guardian automatically contacts emergency services, providing all essential details. Additionally, the system allows caregivers to notify close friends and family, ensuring swift communication. The smart assistant is equipped to understand and converse in multiple languages, thanks to its integration with Speecify and Google’s API. Furthermore, this entire process from fall to phone-call takes less than 10 seconds compared to the several minutes, potentially hours, that this process usually takes.

The second component of Guardian is a web application designed for caretakers, close friends, and family. Through this platform, they can monitor live patient video streams, review fall logs, and access important metrics on patient activity levels at a glance. Guardian’s overall goal is to ease the healthcare and post-operative experience, offering peace of mind to both healthcare professionals and patients.

![guard2](https://github.com/user-attachments/assets/eb120902-8ca3-4712-b1ba-fc905ad998e5)
![guard3](https://github.com/user-attachments/assets/fca06c10-485a-4424-8960-bba942360236)
![guard4](https://github.com/user-attachments/assets/d2888c6e-2933-45e1-a6a4-3d2bb5ee7b31)
![guard5](https://github.com/user-attachments/assets/41aa08da-6eb6-4718-a99b-9271008003ad)

## How we built it 👨🏽‍💻
We built Guardian by carefully integrating a suite of technologies designed to enhance patient care through automation and real-time responsiveness. For fall detection, we utilised Python to automate key processes, leveraging Roboflow's SDK Inference for computer vision to accurately identify falls in real time. For the smart assistant functionality, we employed Speechify’s API to handle text-to-speech conversion, enabling seamless communication. On the input side, we incorporated Google’s API for speech-to-text, allowing the system to process verbal commands. We then utilised OpenAI’s API to perform sentiment analysis, ensuring the system could gauge the emotional tone of interactions. To complete the workflow, Twilio’s API was integrated to automate emergency calls and messages, ensuring that in the event of a detected fall, help is immediately alerted.

For the monitoring component, we used Figma to create the intuitive design, developed a web application using NextJS, used TailwindCSS for styling, and MongoDB for the backend to manage data.

## Challenges we ran into 🕚
When building Guardian, we encountered several significant challenges that required careful problem-solving. One of the more technical hurdles was learning how to effectively implement WebSockets to stream webcam footage from one device to another, ensuring that live video feeds could be seamlessly displayed on the web app’s front end. This required a deep understanding of real-time communication protocols and overcoming latency issues to maintain a smooth user experience.

Another key challenge was integrating multiple APIs within the Python script, each serving a unique function—computer vision, text-to-speech, sentiment analysis, and emergency notifications. Stitching these together into a cohesive and efficient system demanded rigorous debugging and orchestration, as ensuring smooth interaction between disparate services proved to be both complex and time-consuming.

## Accomplishments that we're proud of 🥇
When we entered this hackathon, our primary goal was simply to learn as much as possible, create a modest project, and enjoy the experience. As the 36-hour challenge drew to a close, we not only achieved these goals but exceeded our own expectations. We've walked away with an immense amount of new knowledge, shared countless moments of fun, and built Guardian—a project that we are genuinely proud of. The journey was as rewarding as the outcome, and what began as a learning experience evolved into the creation of something impactful and meaningful.

## What we learned 🧠
Throughout the development of Guardian, we gained valuable experience working with a diverse array of APIs, including Roboflow for computer vision, Speechify for text-to-speech, Google’s speech-to-text, and Twilio for automating emergency notifications. Beyond technical skills, we deepened our understanding of how to efficiently read and interpret documentation, troubleshoot bugs, and collaborate effectively within a team. We also learned some lighter lessons along the way—like discovering the upper limit of how many fruit snacks one can reasonably consume during a hackathon!

## You can see our product demo on Youtube: https://youtu.be/U3v-NOYGvrk?si=8SlsW2z0ElOQGWr9

