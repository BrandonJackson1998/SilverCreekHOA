---
layout: default
title: "Real Estate Agent Info"
nav_order: 2
---

## Real Estate Agent Information

We appreciate your assistance in communicating the following guidelines to sellers and buyers.

---

## Leasing a Unit

Units may **NOT** be leased, rented, or sublet in any form. This includes Airbnb, VRBO, month-to-month leases, or short-term rentals.

---

## HOA Dues Collected at Closing

Contact the HOA for the balance of a unit's account to be collected at closing.

* The first month's dues (currently **$250**) are collected at closing from the Buyer.
* Autopay is available and strongly encouraged.
* Instructions will be sent to the buyer after closing.

---

## Sign Placement & Duration

* **'For Sale' Signs:** Must be placed in a planter area (not grass) to avoid impeding turf maintenance or watering.
* **'Open House' Signs:** Limited to exactly *one* sign within Silver Creek. Additional 'Open House' signs may only be placed outside the community.
* Offending signs may be removed without notice.
* Signs should be removed as soon as possible after the Open House and/or closing.
* Refer clients to the Directory monument next to the Clubhouse to locate your listed property, or include a map with directions in your listing (see community map below).

---

## Insurance Information

Insurance documents and certificates are available on the [HOA Insurance Summary page](/SilverCreekHOA/insurance-summary/).

---

## Clubhouse Keys

It is the responsibility of the Seller to ensure the Buyer is in possession of the **Facilities Key Paddle** (with the Clubhouse Key and Pool Access Fob attached) at or before closing. Failure to transfer these keys will result in a **$100.00 fine** to the Seller for a lost key paddle.

---

## Occupancy

Occupancy by a new owner is assumed at closing. Extended or delayed occupancy by the seller may be considered a lease and is strictly prohibited.

---

## Self-Management & Contact Info

Silver Creek is self-managed. Direct all inquiries to the Board of Trustees:

**Silver Creek Townhomes**  
1732 W 540 N #163  
St. George, UT 84770  
**Phone:** [(435) 414-1817](tel:4354141817)  
**Email:** [silvercreekboardmembers@gmail.com](mailto:silvercreekboardmembers@gmail.com)

---

## Frequently Asked Questions

Looking for more specific details? Check out our [Silver Creek HOA Frequently Asked Questions](/SilverCreekHOA/faq/).

---

## Association Public Website

You are welcome to freely share information from our public website: [https://silvercreek-hoa.org](https://silvercreek-hoa.org)

---

## Community Map

{% assign map_pdf = site.static_files 
  | where_exp: "file", "file.path contains 'Community-Map-paper.pdf'" 
  | first %}

{% if map_pdf %}

<div class="pdf-wrapper">
        <iframe 
            src="{{ map_pdf.path | relative_url }}">
        </iframe>
    </div>

{% else %}

<p>Community Map not found.</p>

{% endif %}