---
layout: default
title: "Forms List"
nav_order: 1
---

<h1>Community Forms</h1>
<p>Select a form below to open the viewer or download a copy.</p>

{% assign all_files = site.static_files | where_exp: "file", "file.extname == '.pdf'" %}
{% assign forms = "" | split: "" %}

{% for file in all_files %}
    {% if file.path contains "HOA-Documents/Forms" %}
        {% assign forms = forms | push: file %}
    {% endif %}
{% endfor %}

<!-- Sort alphabetically by name -->
{% assign sorted_forms = forms | sort: "name" %}

<ul class="info-list" style="list-style: none; padding-left: 0;">
    {% for file in sorted_forms %}
        <!-- 1. Clean up file extensions, hyphens, and plus signs -->
        {% assign clean_name = file.name | remove: ".pdf" | replace: "+", " " | replace: "-", " " %}
        {% assign words = clean_name | split: " " %}
        
        <!-- 2. Dynamically extract dates (handles 2026, 2024-12, etc.) -->
        {% assign date_string = "" %}
        {% assign desc_words = "" | split: "" %}
        
        {% for word in words %}
            <!-- Check if the word looks like a year or date segment -->
            {% assign first_char = word | slice: 0 %}
            {% if word.size == 4 and first_char == "2" %}
                {% assign date_string = " (" | append: word | append: ")" %}
            {% elsif word.size == 2 and forloop.index == words.size %}
                <!-- Handles trailing month numbers like 2024 12 -->
                {% assign prev_idx = forloop.index0 | minus: 1 %}
                {% assign prev_word = words[prev_idx] %}
                {% if prev_word.size == 4 %}
                    {% assign date_string = " (" | append: prev_word | append: "-" | append: word | append: ")" %}
                {% endif %}
            {% else %}
                <!-- Check if it's a 4 digit year that was already grouped -->
                {% assign next_idx = forloop.index0 | plus: 1 %}
                {% assign next_word = words[next_idx] %}
                {% unless word.size == 4 and next_word.size == 2 and next_word.size > 0 %}
                    {% assign desc_words = desc_words | push: word %}
                {% endunless %}
            {% endif %}
        {% endfor %}
        
        {% assign desc = desc_words | join: " " %}

        <!-- 3. Dynamic lower-to-uppercase space injector for camelCase files -->
        {% assign uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" | split: "" %}
        {% assign lowercase = "abcdefghijklmnopqrstuvwxyz" | split: "" %}
        {% assign chars = desc | split: "" %}
        {% assign formatted_desc = "" %}
        
        {% for char in chars %}
            {% assign idx = forloop.index0 %}
            {% assign prev_idx = idx | minus: 1 %}
            {% if idx > 0 %}
                {% assign prev_char = chars[prev_idx] %}
                {% if lowercase contains prev_char and uppercase contains char %}
                    {% assign formatted_desc = formatted_desc | append: " " %}
                {% endif %}
            {% endif %}
            {% assign formatted_desc = formatted_desc | append: char %}
        {% endfor %}
        
        <!-- Clean up acronyms like ARA -->
        {% assign final_title = formatted_desc | replace: "A R A", "ARA" | strip %}

        <!-- Render the Row -->
        <li style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
            <strong>{{ final_title }}{{ date_string }}</strong>
            <br style="margin-bottom: 5px;">
            
            <!-- OPEN INLINE VIEWER (Matches Newsletters behavior) -->
            <a href="#" 
               class="pdf-open" 
               data-pdf="{{ file.path | url_encode | relative_url }}">
                View Form
            </a>
            
            <!-- DOWNLOAD -->
            <a href="{{ file.path | url_encode | relative_url }}" download style="margin-left: 15px;">
                Download PDF
            </a>
        </li>
    {% endfor %}
</ul>

<!-- =========================
     PDF MODAL VIEWER
========================= -->
<div id="pdf-modal" class="lightbox">
    <span class="close">&times;</span>

    <iframe id="pdf-frame" class="pdf-frame"></iframe>

    <a id="pdf-download" class="pdf-download" download>
        Download PDF
    </a>
</div>