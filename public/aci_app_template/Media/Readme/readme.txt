Visualization Dashboard
=====================================
#Introduction

This app provides various top-n topics on APIC and switches which are ranked based on their selected attributes. For example, top 10 interfaces ranked based on their ingress utilization; top 20 Tenants ranked by number of end-points, etc.

#Features

1. We provide different options for "top-n" number, "topic", "order-by attribute" and "time duration". User can select combinations of these options to make their own visualization dashboard. The default combination is "Top 10 physical interface ranked based on their Ingress total traffic starting with last 5 minutes."

2. "Compact" button puts two charts side by side, which shows a compact layout of the charts; "normal" button sets the charts back to normal layout.

3. Add button "+" appends a new chart to the dashboard.

4. Charts are draggable. Users can sort and reorder them by clicking on the header of each chart and drag it to target places.

5. The graph inside each chart is zoomable.

6. Hover on the graph element (cylinder or pie) to show detail information.

7. Remove button in the upper right corner of each chart removes the chart away from the dashboard.

8. Refresh the chart with the refresh button inside each chart. Refresh all the charts with the white refresh button in the upper right corner of the dashboard.

9. For numbers more than 10, click on the "Others" component to show a list of the results with their ranks and values.

10. When the respond dataset is large and respond time is long, the loading progress bar shows the data loading status.

#Workflow

This application sends RESTful API queries to APIC to for different combination selections. As soon as it get thes results from APIC, it visualize them in a form of bar chart or pie chart, based on the topic user selects.

