---
layout: default
title: "Board Meeting Dates"
nav_order: 1
---

{% assign year = "now" | date: "%Y" %}

## Silver Creek Townhomes Association  
## {{ year }} Board of Trustees Meeting Schedule

All owners are welcome to visit and observe regular Board Meetings in person or online via **Zoom**.

* **Zoom Information:** Login links are published in the monthly agenda and posted on the website home page at least 48 hours prior to each meeting.
* **Homeowner Open Forum:** Homeowners may address the Trustees with comments, concerns, or ideas. Please arrive on time, as the Homeowner’s Open Forum is generally the first item on the agenda. Comments are limited to **2 minutes** per homeowner/unit.
* **Location:** Meetings are always held in the **Silver Creek Clubhouse** unless otherwise noted.
* **General Schedule:** 
  * Trustee Meetings are generally held on the **3rd Thursday of each month at 6:30 PM** (date and time are subject to change).
  * Annual Meetings are generally held on the **3rd Saturday in January at 6:00 PM** (date and time are subject to change).

This page indicates the intended dates and times for {{ year }}.

---

## {{ year }} Scheduled Meeting Dates

{% assign months = "01,02,03,04,05,06,07,08,09,10,11,12" | split: "," %}

{% for m in months %}
  {% assign date_str = year | append: "-" | append: m | append: "-01" %}
  {% assign first_day_w = date_str | date: "%w" | plus: 0 %}
  
  {% comment %} Calculate day offset for 3rd Thursday (day 4 of week) {% endcomment %}
  {% assign offset_thurs = 4 | minus: first_day_w %}
  {% if offset_thurs < 0 %}
    {% assign offset_thurs = offset_thurs | plus: 7 %}
  {% endif %}
  {% assign third_thursday_day = offset_thurs | plus: 15 %}
  
  {% comment %} Format and display 3rd Thursday {% endcomment %}
  {% assign thurs_day_str = third_thursday_day %}
  {% if third_thursday_day < 10 %}{% assign thurs_day_str = "0" | append: third_thursday_day %}{% endif %}
  {% assign thurs_full_date = year | append: "-" | append: m | append: "-" | append: thurs_day_str %}

* **{{ thurs_full_date | date: "%B %e, %Y" }}** at 6:30 PM

  {% comment %} Check for 3rd Saturday in January (day 6 of week) {% endcomment %}
  {% if m == "01" %}
    {% assign offset_sat = 6 | minus: first_day_w %}
    {% if offset_sat < 0 %}
      {% assign offset_sat = offset_sat | plus: 7 %}
    {% endif %}
    {% assign third_saturday_day = offset_sat | plus: 15 %}
    
    {% assign sat_day_str = third_saturday_day %}
    {% if third_saturday_day < 10 %}{% assign sat_day_str = "0" | append: third_saturday_day %}{% endif %}
    {% assign sat_full_date = year | append: "-" | append: m | append: "-" | append: sat_day_str %}

* **Saturday, {{ sat_full_date | date: "%B %e, %Y" }}** at 6:00 PM — **Annual Homeowner Meeting**
  {% endif %}
{% endfor %}