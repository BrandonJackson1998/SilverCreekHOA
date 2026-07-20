---
layout: default
title: "Real Estate Agent Info"
nav_order: 1
---

## Real Estate Agent Information

We appreciate your assistance to communicate the following to sellers and buyers

---

## Leasing a unit

Units may NOT be leased, rented or sublet in any form, which includes Airbnb, VRBO, month-to-month, etc.

---

## HOA Dues collected at closing

Contact the HOA for the balance of a unit's account to be collected at closing.

The first month's dues, currently $250, are collected at closing from the Buyer.

Autopay is available and strongly encouraged.

Instructions will be sent to the buyer after closing.

---

## Sign Placement & Duration

'For Sale' signs must be placed in a planter area (not grass) of yards, so as to not impede the maintenance or watering of the turf.

'Open House' signs are limited to exactly *one* within Silver Creek.

Additional 'Open House' signs may only be placed outside the community.

Offending signs may be removed without notice.

Signs should be removed as soon as possible after the 'Open House' &/or closing.

Refer clients to the Directory monument next to the Clubhouse to specifically find your listed property or include a map with directions in your listing.

Silver Creek directory map is available below.

---

## Insurance information

Insurance information is posted on this website:

https://silvercreek-hoa.org/homeowners/hoa-insurance-summary

---

## Clubhouse Keys

It is the responsibility of the Seller to ensure the Buyer is in possession of the Facilities Key Paddle, with the Clubhouse Key and Pool Access Fob attached, at or before closing to prevent a $100.00 fine to the Seller for a lost Facilities Key Paddle at closing.

---

## Occupancy

Occupancy by a new owner is assumed at closing.

Extended / Delayed occupancy by the seller may be considered a lease and is not allowed.

---

## Self Management

Silver Creek is self-managed.

Direct all inquiries to the Board of Trustees contact listed below.

---

## Property Management

Silver Creek Townhomes  
1732 W 540 N #163  
St George, UT 84770  
435-414-1817  
silvercreekboardmembers@gmail.com  

---

## Frequently Asked Questions

You may be looking for more specific information that has been answered here:

Silver Creek HOA Frequently Asked Questions

---

## Association Public Website

https://silvercreek-hoa.org

You are welcome to freely share this information.

---

## Community Map

{% assign map_pdf = site.static_files 
  | where_exp: "file", "file.path contains 'Community-Map-paper.pdf'" 
  | first %}

{% if map_pdf %}

<iframe 
  src="{{ map_pdf.path | relative_url }}"
  style="width:100%; height:900px; border:none; display:block;">
</iframe>

{% else %}

<p>Community Map not found.</p>

{% endif %}