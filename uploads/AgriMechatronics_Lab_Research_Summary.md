# AgriMechatronics Lab Research Overview
**North Dakota State University — Department of Agricultural and Biosystems Engineering**
**Lab Supervisor: Dr. Sulaymon Eshkabilov**

---

## Introduction

The NDSU AgriMechatronics Lab conducts applied research at the intersection of mechatronics, robotics, sensing, and artificial intelligence, all directed at solving practical problems in agriculture. The lab's work is organized around three broad research domains:

1. **Honeybees** — Modeling, Identification, and Prediction
2. **Controlled Environment Agriculture (CEA)**
3. **Robotics and Robot Applications**

Across these domains, the lab runs roughly eighteen distinct student-led projects, each supervised by Dr. Eshkabilov. The work blends custom sensor and PCB design, machine learning, computer vision, unmanned ground and aerial vehicles, and field-deployable IoT systems. This document summarizes each project's motivation, methodology, and key results as presented.

---

## Domain 1: Honeybees — Modeling, Identification, and Prediction

### 1.1 Honeybee Vibrational Response Study
**Team:** Brady Lindsey, Jewel Woodcock, Shoaib Ahmmad, Joanna Daniella Fajardo, Joha Md. Ibne, Tyan Onnolu

**Research Questions:**
- Can the vibrational response of honey bees and their larvae be measured non-invasively using a laser vibrometer?
- What are the frequency response characteristics of bees and larvae under normal versus excited conditions?
- Which frequencies and magnitudes during excitation are most stressful to bees and larvae?

**Objectives:** Establish ground-truth vibrational response data, classify the onset of stress from excitation, and ultimately reduce or eliminate stress-inducing frequencies during colony transport.

**Methodology:** The team worked with three Buckfast honey bee colonies housed at a USDA facility. To study larvae specifically, the queen was trapped on half of a frame using a 3D-printed trap so she would lay eggs in a controlled area while worker bees could still pass through. After 24 hours the trap was moved to the other half of the frame, and 3D-printed larvae markers were placed over selected cells for measurement. The marked frame was then transferred into a custom display "nuke" (nucleus) colony, with a queen pheromone stick used to simulate normal hive conditions. Measurements were taken using a laser vibrometer synchronized with a high-speed camera, with the colony and instrumentation mounted on a shaker table capable of controlled excitation (e.g., initial tests at 10 Hz). A new nuke colony was established on the test bed in June 2026.

**Results:** FFT analysis of larvae from October and December 2025 testing was grouped by age (1–2 days, 2–3 days, 3–4 days, 4–5 days). Peak-frequency analysis across these age groups showed that **8 Hz** was a shared/common resonant frequency across all larval age groups, though the secondary peak frequency and its variability differed by age. Short-time Fourier transform (STFT) analysis of initial larvae testing captured how these vibrational signatures evolve over time and frequency simultaneously.

**Planned Improvements:**
- Simulating a more complete colony (queen plus worker bees caring for larvae) since prior tests were capped at two hours to avoid larvae starvation, which could otherwise alter natural behavior.
- Improving the physical mounting of the test rig to the shaker table.
- Incorporating STFT analysis for richer time/frequency insight.
- Synchronizing laser, microphone, and high-speed camera data through a shared IMC data acquisition (DAQ) system.

---

### 1.2 Honeybee Fanning Detection via Monocular Camera (Without Foundational CV Models)
**Team members presenting this project:** Jewel Woodcock and Shoaib Ahmmad (parallel presentations of the same core project)

**Motivation/Problem:** Fanning is a wing-beating behavior bees use for hive ventilation, and detecting it is useful for monitoring hive health. However, state-of-the-art computer vision foundation models perform poorly at detecting the fine wingbeat motion involved in fanning:
- Annotating datasets of fanning behavior is difficult and often inaccurate.
- Even with careful annotation and strong training, models tend to learn that "blurry pixels near bees" indicate fanning, which produces false negatives in other cases.
- Foundation models are highly sensitive to lighting, color, and scene composition — a new hive or new imaging setup effectively requires re-annotating and retraining.
- Even after quantization, these models run sluggishly on consumer CPUs and edge devices.

**Approach:** Rather than relying on foundation models, the team developed a lightweight motion-differential approach that visualizes honeybee wing movement as **motion flux heatmaps**, derived directly from frame-to-frame pixel differences in monocular video. This approach was built into two custom applications under the brand **BeeVision**:
- A **desktop/edge application** ("Fanning Detection – Hybrid System") featuring live tracking feed, flux heatmap, 2D scatter of bee positions/trails, pose analytics, and GPU (CUDA) acceleration support (tested on an NVIDIA RTX 3050 Ti laptop GPU).
- A **web application** with live streaming, fan/total/flux/frame metrics, tracking feed, and flux heatmap — enabling remote monitoring from a mobile device connected to the same stream.

Both applications were demonstrated running simultaneously and syncing live video from a desktop to a paired phone app.

**Pros vs. cons of removing the foundational CV model:**

| Pros | Cons |
|---|---|
| Significantly higher accuracy | Requires tuning for varying lighting conditions |
| Super lightweight | Still requires some annotated data for bee tagging/tracking (detection and tracking models), but far less than before (roughly 50–100 samples is sufficient) |
| Works across versatile lighting conditions | |
| Very low dataset-labeling burden | |
| Easy to implement on edge devices | |
| Near-zero false positives | |

### 1.3 Thermal Imaging for Non-Invasive Hive Monitoring
*(Related sub-project, also led by Jewel Woodcock)*

**Research Objective:** Develop and evaluate an AI-based thermal imaging system to identify and classify hive components and assess colony conditions without opening the hive.

**Research Questions:**
- Can AI accurately identify and differentiate honey bees, hive structures, hive pests, and colony resources from thermal images?
- Can thermal imaging plus AI assess colony health and activity non-invasively?

**Methodology:** Thermal images were captured of hives (labeled RA-B2, RA-B3, etc.) using a thermal camera on a tripod connected to a laptop for real-time visualization, powered by a portable battery unit in field/outdoor settings. Images were manually annotated and labeled using an image-labeling tool with defined classes such as OpenCell, CappedBrood, HiveBeetle, HoneyBeeThorax, CappedHoney, HoneyBeeWings, and QueenBee, using polygon, brush, and superpixel segmentation tools. Thermal signatures were also used to visually distinguish "full" hives from "empty" hives based on heat patterns radiating from the hive boxes.

---

### 1.4 Bee-Hive Monitoring Using Wireless Sensor Network
**Team:** Joanna Daniella Fajardo

**Objectives:**
- Design and evaluate a smart honey bee monitoring system integrating CO₂ and piezoelectric sensors with wireless communication for real-time hive health assessment.
- Assess how honey fill level influences sensor response, and determine optimal placement of piezoelectric sensors for reliable hive vibration monitoring.

**Approach:** A custom sensor node combines a handheld CO₂/temperature meter for calibration reference with an embedded wireless sensor board (visible in the demonstration video) for continuous, low-power monitoring. The video demonstration showed the developed smart hive monitoring system alongside piezoelectric sensor testing.

---

### 1.5 Bee Excitor Project
**Team:** Md. Ibne Joha

**Objectives:**
- Build a non-invasive active vibration excitation and sensing system to quantify honey bee colony behavioral responses and health status.
- Develop a multimodal sensing framework combining environmental, acoustic, and vibrational measurements.
- Create an Edge-IoT-enabled precision beekeeping platform supporting real-time analytics, anomaly detection, remote monitoring/control, and intelligent decision-making.

**System Architecture:** The proposed IoT-driven framework consists of:
- **Excitation Unit** — a physical "knocker" mechanism mounted to the beehive.
- **Sensing Unit** — environmental sensors (temperature, humidity, CO₂ in ppm), an acoustic MEMS microphone, and a piezoelectric vibration sensor.
- **Data Acquisition & Control** — an ESP32 module for real-time data collection, a Raspberry Pi for edge computing, and a database for data management, connected via MQTT.
- **Power Management Unit** — 24V DC supply for the excitation mechanism plus a battery pack for the sensor node.
- **Data Analytics** — environmental, acoustic, and vibration data analysis pipelines performing preprocessing, feature extraction, pattern recognition, and AI-based analysis.
- **Dashboard and Alerts** — real-time monitoring, interactive control, alerts/notifications, scheduling, reporting, data export, and colony health assessment.

**Experimental Setup:** Custom PCBs were designed for (a) the environmental sensing module (housing an SCD30 CO₂ sensor and other components) and (b) the vibration excitation "knocker" module (built around an ESP32 with a DS3231 real-time clock). These were integrated into a physical prototype including a user interface tablet, the custom PCB unit, a knocker system, and a Raspberry Pi edge computer, mounted to a wooden beehive frame.

**Results:** A custom dashboard displays real-time environment monitoring (temperature, humidity), actuator control (12 programmable daily schedules, manual "fire solenoid" trigger, calibration and positioning controls for the knocker), and combined temperature/sound and humidity/CO₂ visualizations (e.g., readings around 25.4 °C, 38.7% humidity, 663.6 ppm CO₂, and a sound level peak of 256 in the shown session).

**Conclusion:** The framework demonstrates the feasibility of combining active colony excitation, multimodal sensing, and IoT edge computing into a unified precision beekeeping platform. The team expects AI-driven analytics and automated alerts to improve early detection of colony stress and support a scalable foundation for future intelligent apiculture systems.

---

### 1.6 Honey Concentration Detection in Bee Combs Using Image Analysis and UWB Radar
**Team:** Mohammad Aftabi Talami

**Objective:** Monitoring how full honeycombs are with stored honey is a labor-intensive manual task. This project introduces a novel combination of ultra-wideband (UWB) radar sensing and image analysis to estimate the percentage of stored honey in a comb, with two specific goals:
1. Estimate honey amount in combs using true-color images and image analysis techniques.
2. Evaluate the performance of the **SLMX4** UWB sensor for detecting honey amount in a single honeycomb.

**Methodology:** The image-analysis pipeline processes a raw comb photo through grayscale conversion, thresholding/binarization, and color-space segmentation (isolating honey-filled cells in red, then converting to a normalized green mask) to ultimately produce a binary mask representing filled versus empty cells. In parallel, a custom UWB radar unit (built around the SLMX4 sensor with a dual-antenna PCB) was used to scan honeycombs (labeled Honey Comb #1 and #2) from a fixed tripod-mounted setup within an anechoic chamber, at carefully measured distances (e.g., 1.49 m, 1.38 m, 1.6 m from sensor to comb, with a 22 cm gap between two comb positions) on a wooden test platform.

**Results:** Radar amplitude increased with the percentage of the comb filled with honey. Radar waveform amplitude plots at fill levels of 0%, 19%, 27%, 42%, 65%, 77%, 81%, and 100% showed clear amplitude ordering. Estimates from radar and image analysis were benchmarked against physically measured fill percentages; a comparison matrix showed:
- **Measured vs. image-analysis estimate:** 98.1% agreement
- **Measured vs. UWB radar estimate:** 82.9% agreement
- **Image-analysis vs. radar estimate:** 77.3% agreement

A fitted-line plot of measured versus estimated percentage showed a close correlation, indicating both techniques can non-destructively assess honey fill level, with image analysis performing somewhat more accurately than UWB radar in this study.

---

## Cross-Domain: Farm Machinery and Engine Research

### 2.1 Social Implications of Clean Energy Tractors for Farming
**Teams (two related presentations):**
- Omid Nazempour, Mohammad Aftabi Talami, Luke Bordeaux
- Mohammad Aftabi Talami, Istiak Md. Shafi

This project examines the broader social and economic implications of transitioning farm tractors to clean-energy powertrains, using both a conventional engine (a small diesel engine model shown) and a large Case IH Steiger tractor as reference platforms, and connecting to the lab's UGV robotics platforms as examples of electrified/robotic farm equipment.

### 2.2 Application of AI in Engine Modeling
**Team:** Omid Nazempour, Mohammad Aftabi Talami, Luke Bordeaux

**Methodology:** The team used an engine dynamometer test cell (with a control console and an absorber/engine test rig) to run a diesel engine through a stepped-speed test protocol from 800 to 2200 RPM, recording torque, absorber RPM, fuel flow, load cell readings, air-fuel ratio (AFR), barometric pressure, humidity, knock sensor signal, exhaust gas temperatures (EGT) across 8 cylinders, air temperature, accelerometer data, supply voltage, servo feedback, and airflow — over 20 synchronized channels total.

**Results:**
- Torque and power both increased with engine RPM (from roughly 22.5 N·m / low kW at 800 RPM up to ~40 N·m and ~9 kW near 2200 RPM), with coefficient-of-variation (CoV) values reported at each RPM step ranging from about 0.2% to 1.9%.
- Emissions (CO₂, NO, HC in various units) generally increased with RPM, with CO₂ rising most notably.
- The lambda (air-fuel equivalence ratio) increased steadily with RPM from about 0.960 to 0.970, indicating a trend toward leaner combustion at higher speeds.

This dataset is intended to support AI-based engine modeling — using the many recorded sensor channels as training data for predictive models of engine performance and emissions.

### 2.3 Tractor Operation Simulator Software
**Team:** Mohammad Aftabi Talami

**Goal:** Revisit Becker's equation (a classical tractive-force/draft-force model) and evaluate tractor modeling performance against real field data.

**Objectives:**
- Compare implement-model results with real field test results.
- Compare tractor-model results with real field test results.
- Develop an application that estimates required power, draft forces, and emissions for a given operation and tractor.

**Results:** Multiple field runs (labeled Run 2 through Run 11, under "High" and "Normal" speed/load conditions, one run marked "Incomplete") were recorded for speed, draft/pull force, and engine power over time, each compared against modeled predictions (shown as shaded confidence bands). The team built a software tool called **"Farming Machinery Assistance"** with a tabbed interface covering:
- **Vehicle/Drive** — vehicle selection (e.g., Case IH Steiger Series Rowtrac tractor), mass, wheelbase, static front fraction, CG height, drawbar geometry, rolling resistance coefficient, drivetrain efficiency, auxiliary power, and gravity.
- **Implement** — implement selection (e.g., a chisel plow with 5 cm working width per unit), soil texture, number of tools/shanks, tillage depth, and draft coefficients (A, B, C, and soil factor Fᵢ) drawn from Hunt/ASABE-style draft equations.
- **Traction** — cone index, device width/diameter, number of driven front/rear devices, slip model, and traction relationships (visualized with a tire-soil contact diagram).
- **Simulation and Results** — a summary table and an "Engine Power Band" plot showing predicted power over time versus a target speed, with exportable results.

---

## Domain 3: Robotics and Robot Applications

### 3.1 Control and Navigation of Unmanned Ground Vehicles (UGVs) in the Fields
**Team:** Mohammad Aftabi Talami

**Objective:** Design navigation and speed control for a UGV intended for agricultural applications (e.g., weed control) to reduce labor-intensive fieldwork. A central concern is **loss of traction**, which causes:
- Loss of energy
- Reduced precision in farming operations
- Reduced efficiency of smart farming overall

The team implemented and validated controllers and sensors enabling the UGV to self-correct while driving between crop rows and to minimize traction loss.

**Platform:** The four-wheeled UGV includes a GNSS receiver, camera, onboard computation unit, dashboard display, hub motors with a CAN bus motor controller, a battery pack, and a separate RTK-GPS base station on a portable tripod mount for high-precision positioning corrections.

**Sub-studies:**
- **Waypoint Generation:** Straight crop rows were detected from imagery, and a serpentine ("boustrophedon") path was generated for the UGV to follow between rows. Field testing demonstrated accurate tracking with a positional error of only **6.85 inches (17.39 cm)**.
- **Crop Row Detection from UAV Imagery:** A rule-based crop row detection method was developed for both straight and curved crop rows. Quantitative evaluation against manually delineated reference rows showed a row-detection accuracy (ROR) exceeding **99%**, with RMSE values below **5 cm**.
- **Tire Force Estimation and UGV Modeling:** The team developed a "USSWGV" (understeer/skid-steer wheeled ground vehicle, based on the labeled model) dynamic model incorporating tire forces from all four independently steerable/driven wheels. Experimental results comparing a sinusoidal reference path against the vehicle's actual response and a reconstructed path (using estimated tire forces) showed the model reproduces measured vehicle motion with **RMSE < 1.5%**, validating the modeling approach against real robotic platform data.

---

### 3.2 Site-Specific Mechanical Weeding System (SSMW)
**Team:** Shafi Md. Istiak

**Motivation:** Weeds significantly reduce crop yield and productivity; for example, sugar beet yield losses attributable to weeds total an estimated **$1.25 billion annually**. Herbicide-resistant weeds also make chemical control increasingly ineffective.

**Objectives:**
- Design an individually controlled, self-adjustable shank-based three-row cultivator.
- Integrate the cultivator with an autonomous robotic platform for RTK-GPS-guided, site-specific weeding — i.e., only tilling where weeds are actually present, rather than the entire row.

**System Design:** The workflow begins with drone imagery of the field, which is processed into a prescription weed map (a grid marking weed-present vs. weed-free zones). This map is sent (via gRPC) to an onboard SSMW controller (a Raspberry Pi–based unit), which issues actuator ON/OFF commands over CAN bus to the SSMW cultivator's individually controlled shanks, while the robot's own position is tracked via RTK-GPS (corrections delivered over WiFi from a base station).

The cultivator mechanism itself uses a four-bar linkage per shank with a linear actuator, a laser distance sensor and reflective screen for real-time position feedback, and strain-gauge load cells (in a quarter-bridge configuration with amplification/ADC and low-pass filtering) to measure tillage draft force.

**Operation Logic:** As the robot travels down a row, the controller toggles the actuator on when weeds are detected (engaging the tillage sweep into the soil) and off when the row segment is weed-free (raising the sweep). The system accounts for uneven ground conditions by adjusting actuator timing so the sweep still fully engages/disengages the soil appropriately.

**Field Test Results:**
- Total row length tested: 219.45 m; total length actually requiring tillage (i.e., containing weeds): 106.91 m.
- Length of tillage actually performed by the SSMW robot: 107.08 m.
- Total positional error: 3.93 m.
- Effective length of tillage delivered by the robot: 103.15 m.
- **Efficacy by length: 96.5%**
- **Energy savings: 48.7%** (relative to tilling the entire row length)
- **Soil disturbance reduction: 48.7%**

These results indicate the system nearly matched the ideal targeted-tillage length while cutting energy use and soil disturbance roughly in half for a field with about 50% weed presence.

---

### 3.3 Farm Robotic Challenge 2026
**Team:** Joanna Daniella Fajardo, Landen Krause, Shafi Md. Istiak, Mohammad Aftabi Talami, Joha Md. Ibne, Joshua Bruemmer, Artin Sadeghi

The team designed and built an **Autonomous Soil Sampler** robot for a farm robotics competition. The robot integrates:
- A rotating "soil packaging" turret with multiple sample cups.
- A vertically actuated auger and bucket transfer mechanism (with separate "auger vertical motion" and "bucket vertical motion" linear actuators) to excavate soil, transfer it via a chute into individual packaging cups, and transfer soil to a collection bucket.
- GNSS positioning and an onboard camera/control mast, mounted on a four-wheeled robotic chassis.

The presentation includes eight different theoretical field-sampling path patterns (grid, zone-based, boustrophedon variants, spiral/zig-zag, and multi-region split patterns) that were considered for planning sampling routes across a field.

**Outcome:** The team's robot was named among the **Top 5 Finalists** in the competition, as documented by a team photo with the completed robot (branded with a "farm-ng" chassis platform).

---

### 3.4 IoT and Wireless Sensor Network Development for Sugar Beet Storage
**Team:** Bakht Alam Khan

**Project Vision:** Sugar beets stored in large field piles are prone to rot and quality loss. The system targets three sensing categories:
- **Gas Analysis** — monitoring volatile organic compounds (VOCs) and ethanol concentration as early-warning markers of microbial rot and anaerobic fermentation.
- **Atmospheric** — precise tracking of CO₂ levels to assess respiration rates and metabolic activity in storage.
- **Conditioning** — real-time temperature and humidity sensing to identify hotspots and high-moisture zones prone to fungal growth.

**Experimental Setup:** Six custom PCBs (each with a CO₂ sensor, temperature/humidity sensing, and a LoRa radio module for wireless transmission) were built. Three were stored at 4 °C and three at room temperature, each alongside real sugar beets inside sealed, non-ventilated buckets meant to replicate field pile storage conditions. Each PCB used a LoRa (RYLR998) module with a unique address, transmitting data for 30 seconds before sleeping for 30 minutes to avoid transmission collisions between boxes, with flash/timing carefully staggered.

**Results:**
- **Room-temperature boxes (53–54):** Relative humidity climbed quickly to roughly 80–90% and stabilized; SGP40 raw signal (a proxy for VOC/ethanol) spiked early and then declined and stabilized; CO₂ rose steadily throughout the ~1-month test, approaching the sensor's ~40,000 ppm range near the end; temperature fluctuated between about 18–23 °C. These boxes showed signs of high CO₂, humidity, and ethanol buildup almost immediately after deployment. One box (55) failed due to a short circuit caused by condensation.
- **4 °C boxes (50–52):** Relative humidity quickly reached and stayed near saturation (~95–100%); the SGP40 signal was lower overall than the room-temperature group, indicating less ethanol buildup; CO₂ still rose substantially but with more box-to-box variability (one box fluctuated widely between roughly 15,000–40,000 ppm); temperature stayed consistently near 4 °C. Beets in these boxes appeared visibly healthier with less rot/mold when opened, compared to the room-temperature group.

**Future Steps:**
- Build out a full wireless sensor network for continuous data collection and analysis.
- Apply protective coatings to PCBs to address humidity/moisture-related failures.
- Improve TVOC and ethanol sensors with proper calibration.
- Resolve LoRa signal-loss issues.
- Design a new PCB specifically for capturing TVOC/ethanol signatures immediately after harvest.
- Source a CO₂ sensor with a higher measurement ceiling (above 50,000 ppm), since room-temperature storage tends to exceed the current sensor's range.

---

### 3.5 Controlled Environment Agriculture (CEA) in North Dakota
**Team:** Shafi Md. Istiak

**Motivation:** With global population projected to reach 9.7 billion by 2050, roughly 4 million hectares of farmland being lost to infrastructure development annually, and soil erosion depleting nutrients under traditional farming, CEA offers several advantages: year-round crop production, growth in fully controlled soilless (hydroponic) conditions, enhanced biosecurity against pests and drought, and faster plant growth compared to traditional soil-based systems.

**Monitored Parameters:**
- *Environmental:* temperature and relative humidity (DHT22 sensor), light intensity (GY-39), CO₂ (SCD30).
- *Hydroponic:* pH (electrode pH probe), electrical conductivity/EC (TDS sensor), water temperature (DS18B20), and dissolved oxygen.

**System Architecture:** A distributed sensor network uses Arduino Uno R4 boards as MQTT publishers for groups of sensors (EC, pH, dissolved oxygen, temperature via DS18B20; environmental sensors like DHT22, SCD30, BH1750 light sensor), feeding into a Raspberry Pi 5 acting as an MQTT broker and edge computing hub, which also manages actuator control for the growing environment. A Raspberry Pi AI Camera captures plant imagery for growth analysis. Custom sensor module PCBs integrate dissolved oxygen, pH, and EC sensor modules alongside an RGB camera and Raspberry Pi 5.

**Experimental Setup:** Multiple hydroponic grow beds were arranged in a greenhouse, each fed by one of three dosing pumps delivering a range of nutrient solution concentrations (0, 50, 100, 150 ppm from Pump 1; 200, 250, 300, 350 ppm from Pump 2; 400 ppm from Pump 3) across nine monitoring units (MU1–MU9), each tracking pH, temperature, EC, dissolved oxygen, and time-course (TC) images. Lettuce was also grown under different light conditions (daylight, artificial light, and dark) for comparison.

**Greenhouse Data Collection Results:**
- pH generally decreased as nutrient concentration increased (from about 8.7 at 0 ppm down to roughly 5–6 at higher concentrations), while EC increased steadily with nutrient concentration (from about 500 µS/cm at 0 ppm up to over 2000 µS/cm at 400 ppm).
- Normalized EC and pH both tracked daily temperature cycles over a 24-hour period, showing a clear diurnal relationship between environmental temperature and nutrient solution chemistry.

**Machine Learning Application:** A **Gaussian Mixture Model** was applied to cluster plant growth data (visualized via PCA into 6 clusters), correlating clusters against nitrogen solution concentration and growth time in hours. This supports two goals: (1) image-based plant growth-level prediction, and (2) growth-level-informed control of hydroponic nutrient dosing based on temperature, EC, and pH sensor feedback. Six qualitative growth levels (Class 1 through Class 6, labeled Level A–F) were defined from healthy, full lettuce heads down to stunted/reddish, stressed plants.

---

### 3.6 Using Machine Learning Algorithms for Optimizing Lettuce Production
**Team:** Farhin Faiza Neha, Mahmoud Pranto Alam

This overview project introduces a hyperspectral imaging (HSI) workstation used across two related sub-projects (detailed in 3.6.1 and 3.6.2 below): an HSI sensor (Resonon Pika XC2) mounted above a motorized translation stage that scans a single lettuce leaf, producing a hyperspectral data cube that is processed and visualized on a connected laptop.

#### 3.6.1 Application of Hyperspectral Imaging and Machine Learning for Nutrient and Disease Monitoring of Lettuce in Controlled Environment Agriculture
**Presenter:** Farhin Faiza Neha

**Objectives:**
- Integrate leaf, root, and whole-lettuce-plant data.
- Provide non-destructive, real-time monitoring of lettuce grown with **egg-washing wastewater** as an irrigation source.
- Address the sustainability angle and food-safety concerns of wastewater reuse in agriculture, since wastewater is considered a contamination risk for leafy greens.
- Enable non-invasive nutrient and pathogenic disease monitoring.
- Develop feature selection methods and a robust machine learning framework.

**Methodology:** Lettuce leaves, roots, and whole plants were scanned using the HSI system, producing full spectral data cubes. For leaf analysis, spectral bands were processed to generate a false-RGB visualization and mean reflectance spectra (with standard deviation bands) across the leaf's sampled points. For root analysis, a four-step process was used: (1) place the sample under the imaging hood, (2) capture the full hyperspectral cube, (3) apply K-means clustering (k=2) to separate root pixels from background, and (4) extract the false-RGB image and mean/standard-deviation reflectance spectrum specific to the root tissue.

Reflectance spectra were also compared across three independently collected datasets — from USDA, from Purdue University, and from NDSU's own greenhouse — showing broadly consistent spectral shape (a reflectance dip near 550–680 nm and a sharp rise past ~700 nm into the near-infrared "red edge") despite differing absolute reflectance ranges.

**Feature Selection and Modeling Benchmark:** The project incorporates results from an associated benchmarking study, "Benchmarking Feature Selection Approaches for Machine Learning Algorithms for Hyperspectral Data Modelling of Lettuce Cultivars," which compared four feature-selection methods — FDR (false discovery rate), CARS (competitive adaptive reweighted sampling), GA (genetic algorithm), and VIP (variable importance in projection) — combined with multiple regression models (PLSR, ANN, SVR, RF, XGBoost, LightGBM, CatBoost) to predict biochemical traits: SPAD (chlorophyll proxy), ACI, glucose, fructose, sucrose, dry matter (55 °C and 105 °C), vitamin C, beta-carotene, nitrogen, phosphorus, and potassium. Correlation (r) and normalized RMSE heatmaps showed that prediction accuracy varied substantially by trait and method combination, with SPAD and beta-carotene generally showing the strongest correlations (up to ~0.85–0.89) and best (lowest) NRMSE values, while potassium (K) was comparatively harder to predict across most methods.

**Conclusion:** The proposed framework addresses three core research problems in HSI-based plant monitoring: (1) integration of leaf, root, and whole-plant data; (2) feature selection and ML optimization for growth and nutrient estimation; and (3) pathogenic disease detection using combined hyperspectral and RGB imagery.

#### 3.6.2 Prediction of Lettuce Quality Parameters Using Hyperspectral Imaging Data and Machine Learning
**Presenter:** Mahmoud Alam Pranto

**Background/Motivation:** Lettuce is the most studied and commercially significant crop in CEA systems. In 2022, lettuce accounted for nearly one-fifth of the $21.8 billion in total U.S. vegetable and melon cash receipts, and U.S. per-capita lettuce availability was 28.6 lb in 2024. Traditional nutrient estimation methods are destructive, labor-intensive, time-consuming (hours to days per sample via wet chemistry), and impractical for real-time or high-throughput decision-making. By contrast, hyperspectral imaging offers non-destructive, automated, real-time, and scalable measurement of nutrient content, physiological stress, and disease detection — enabling smarter, faster decisions in CEA operations.

**Research Gap:** Existing HSI studies of crops typically analyze only whole-leaf-averaged spectra using standard methods (PCA, PLSR, SVM/SVR, RF, ANN), and prior hydroponic lettuce optimization work has studied variables like pH, EC, temperature, dissolved oxygen, humidity, light intensity, and CO₂, sometimes applying ANN models. However, **no prior study has treated different regions within a single leaf (apex, middle, bottom) as separate spectral inputs to ML models** — an important gap, since these regions differ in stomatal density and vein distribution, which affects their spectral signatures.

**Objectives:**
1. **Evaluate intra-leaf spatial variability** — compare ML model performance when using spectra from the apex (top), middle (central), bottom (base), and complete leaf regions (400–1000 nm) to identify which zone best predicts pH, EC, NO₃⁻, Ca²⁺, and Brix (sugar content).
2. **Assess nutrient composition of different regions** — compare spectral feature-selection methods to find the most informative wavelengths for each leaf region.
3. **Develop a robust AI/ML model framework** — build and validate regression models for stable prediction of the five biochemical quality parameters.

**Methodology:** Tacitus romaine lettuce was grown hydroponically across four experimental tank replicates (three plants per tank), with pH maintained between 5.5 and 6.5 and adjusted regularly. Sampling followed a weekly schedule: Week 1 (transplant three plants per tank), Week 2 (sample the first plant per tank at 3–4 true leaves), Week 3 (sample the second plant at 7–8 true leaves), and Week 4 (sample the third/last plant at 10–15 true leaves) — capturing plants across different growth stages.

For each sampled leaf, the HSI workflow proceeded through five steps: (1) HSI image acquisition using the Resonon Pika XC2 camera on a motorized stage, (2) generation of the raw hyperspectral data cube (x, y, wavelength), (3) leaf segmentation to create a binary mask isolating the leaf from background, (4) extraction of the masked leaf region, and (5) computation of the mean reflectance spectrum. In parallel, ground-truth biochemical measurements (pH, EC, NO₃⁻, Ca²⁺, Brix) were taken for each sample using handheld meters, forming the response variables (Y) to be predicted from the spectral reflectance predictors (X, spanning 350–1000 nm). This paired spectral/biochemical dataset feeds into subsequent machine learning/ANN model development for predicting nutrient and quality parameters.

**Region-Based Spectral Results:** Reflectance spectra collected separately from the apex, middle, and bottom leaf regions showed visibly different spectral characteristics and variance patterns, supporting the premise that region matters — for example, greater spectral spread and lower average reflectance were observed in different regions across the visible range (400–700 nm).

**Conclusion and Significance:**
- *Replacing destructive lab tests:* Traditional wet-chemistry methods destroy the sample and take hours to days; HSI can predict the same parameters non-destructively and in real time.
- *Filling an overlooked gap in intra-leaf spatial biology:* No prior HSI study separates apex, middle, and bottom leaf zones, despite their distinct stomatal densities and vein distributions affecting spectral signal.
- *Enabling real-time CEA monitoring:* This region-based framework targets scalable, real-time nutrient monitoring to support rapid, inline quality checks needed in hydroponic production.

---

### 3.7 Drone Precision Landing Project
**Team:** Md. Ibne Joha

**Objectives:**
1. **Develop and integrate a vision-assisted precision landing system for UAVs** — design, integrate, and validate a camera-based precision landing solution on the IF800 medium-lift UAV platform, establishing reliable MAVLink communication, landing-target detection, and autonomous precision landing capability.
2. **Evaluate landing accuracy and system performance under real-world conditions** — quantitatively assess accuracy, reliability, and operational performance through indoor validation, outdoor flight experiments, sensor verification, and landing-error analysis using real flight logs.
3. **Conduct data-driven analysis for system validation and optimization** — use Python and MATLAB-based tools for flight-log extraction, 3D trajectory reconstruction and visualization, landing performance evaluation, camera behavior analysis, and failure investigation to guide future optimization and larger-scale testing.

**Hardware Setup:** A Landmark precision-landing camera module was integrated into the IF800 UAV's landing gear assembly, connected via a converter module, mating connector, and TX/RX lines, with a damping kit to isolate vibration. Indoor validation involved positioning the UAV above a fiducial landing-target marker on stacked boxes at adjustable, precisely measured heights to verify camera detection and distance measurement. Outdoor testing used a portable landing pad with a fiducial marker, with telemetry monitored live in Mission Planner ground control software during real flight tests in an open field.

**Results:** MATLAB-based 3D trajectory reconstruction of a successful precision-landing flight (using EKF instance XKF1 data) showed the drone climbing to a peak altitude of about 9.09 m, executing a search/approach maneuver, and landing with a final **horizontal landing error of only 8.78 cm** (2D error 0.0878 m; 3D total error 0.4437 m). Detailed flight summary statistics included:
- Landing error rated "**Excellent** – less than 10 cm"
- Drift components: PN (north/south) −0.0865 m, PE (east/west) +0.0151 m
- Maximum altitude: 9.09 m
- Maximum 3D speed: 3.33 m/s; maximum horizontal speed: 0.27 m/s; maximum climb rate: 3.33 m/s; maximum sink rate: 0.61 m/s
- Total flight time: 48.4 seconds, with 1,204 data points sampled at 24.8 Hz

A synchronized 3D animation reconstruction further visualized the full landing sequence with a live telemetry-style readout of altitude, horizontal/vertical speed, drift from the arming point, and a live error breakdown (PN and PE components combining to the total 0.0878 m landing error).

**Conclusion:**
- The precision landing system was successfully integrated and validated, demonstrating reliable target detection and autonomous precision landing capability.
- High landing accuracy was achieved, with landing errors of 8.78 cm under real-world operating conditions.
- Flight-log analysis identified key factors affecting landing performance, providing a foundation for future system improvement and larger-scale testing.

---

## Summary of Lab-Wide Themes

Across all eighteen projects, several recurring engineering themes emerge:

- **Non-destructive, non-invasive sensing** is a consistent goal — whether measuring honey fill percentage, plant nutrient content, hive vibrational stress, or beet storage conditions, the lab consistently favors sensor- and imaging-based approaches over destructive sampling or manual inspection.
- **Custom PCB and embedded systems design** underlies nearly every project, with the team routinely fabricating its own sensor boards (for hive monitoring, beet storage, hydroponic sensing, and the bee excitor system) rather than relying solely on off-the-shelf hardware.
- **Edge computing and real-time dashboards** (built on Raspberry Pi, ESP32, and Arduino platforms with MQTT messaging) recur throughout, reflecting a strong emphasis on field-deployable, real-time decision support rather than purely offline analysis.
- **Machine learning and AI** are applied across very different data modalities — hyperspectral imaging, thermal imaging, motion/optical flow, radar, and time-series sensor data — often benchmarking multiple algorithms and feature-selection strategies rather than assuming one universal best approach.
- **Precision and site-specific control** is a unifying philosophy in the robotics work, exemplified by the site-specific mechanical weeder's targeted tillage and the drone's centimeter-scale precision landing, both aimed at reducing wasted energy, unnecessary soil disturbance, or operational risk.
- **Real field and greenhouse validation** — rather than purely simulated or lab-bench results — is emphasized throughout, with quantitative accuracy metrics (RMSE, percentage efficacy, landing error, correlation coefficients) reported for nearly every system.

---

*This document was compiled from a 98-slide research presentation by the NDSU AgriMechatronics Lab, covering projects across honeybee monitoring, controlled environment agriculture, and agricultural robotics, all under the supervision of Dr. Sulaymon Eshkabilov.*
