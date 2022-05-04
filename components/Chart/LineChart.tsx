import React, { useContext, useEffect, useState } from 'react'
import { Intl, Temporal } from '@js-temporal/polyfill'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTooltip, createContainer, VictoryLabel } from 'victory'
import { Hour } from '../../interfaces/CurrentWeather'
import { AppContext } from '../../context/app.context'

function LineChart(): JSX.Element {
  const { showTab, weatherData } = useContext(AppContext)
  const [fourcastHours, setFourcastHours] = useState<Array<Hour>>([])

  useEffect(() => {
    if (weatherData?.forecast?.forecastday) {
      const { forecast: { forecastday } } = weatherData
      const hours = forecastday.map((days, index) => days.hour).slice(0, 2).flat(1)
      setFourcastHours(hours)
    }
  }, [weatherData])

  const style = {
    label: {
      fill: '#c1bfbe',
      fontSize: 16,
      fontFamily: 'Inter',
      display: 'inline'
    },
    tooltipStyle: {
      fontSize: 20,
      fontFamily: 'Inter'
    }
  }

  const updatedData = fourcastHours?.map((hours, index) => {
    const rawDate = new Intl.DateTimeFormat('en-En', { dateStyle: 'full' }).formatToParts()
    const day = Temporal.PlainDate.from(hours.time).day
    const time = hours.time.split(' ')[1]
  
    const date = `${rawDate[2].value} ${day}, ${time} `
    return {
      ...hours,
      label: `${date} ${String(hours.temp_c)} C `,
    }
  })

  let MAX_TEMP = -90;
  let MIN_TEMP = 90;

  updatedData?.forEach((hour: Hour) => {
    hour.temp_c > MAX_TEMP
      ? MAX_TEMP = hour.temp_c
      : null

    hour.temp_c < MIN_TEMP
      ? MIN_TEMP = hour.temp_c
      : null
  })

  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")
  
  return showTab === 2 
    ? <VictoryChart
        style={{
          parent: {
            width: "1120",
            height: '340px'
          }
        }}
        domainPadding={10}
        width={1124}
        height={360}
        containerComponent={<VictoryZoomVoronoiContainer />}
      >
      <VictoryAxis
        dependentAxis
        // animate
        style={{
          axis: {stroke: "#756f6a34"}
        }}
        tickLabelComponent={<VictoryLabel dy={20} style={[{ fill: "#756f6a80" }]}/>}
      />

      <VictoryLabel x={25} y={20}
        style={style.label}
        text={`Max ${MAX_TEMP} C`}
      />
      <VictoryLabel x={25} y={360}
        style={style.label}
        text={`Min ${MIN_TEMP} C`}
      />
      <VictoryLine
        animate
        labelComponent={<VictoryTooltip style={style.tooltipStyle} />}
        interpolation="natural"
        data={updatedData}
        y={'temp_c'}
        x={'time'}
        style={{
          data: {stroke: "url(#myGradient)", strokeWidth: '6px', strokeLinecap:'round'}
        }}
      />
      <svg height="0">
        <defs>
          <linearGradient id="myGradient" x1="599" y1="100" x2="599" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3D00"/>
            <stop offset="0.5" stopColor="#7ABFFE"/>
            <stop offset="1" stopColor="#1C8DF5"/>
          </linearGradient>
        </defs>
      </svg>

        {updatedData.map((hour, index) => {
          return (
            <VictoryAxis
              dependentAxis
              // label={hour.label}
              key={index}
              style={{
                tickLabels: {fill: "none"},
                axis: { stroke: "#756f6a24" },
                ticks: {stroke: "#756f6a", size: 1},
              }}
              axisValue={hour.time}
            />
          )
        })}
      <VictoryAxis
        tickFormat={(ticks) => ticks.split(' ')[1].split(':')[0]}
        tickLabelComponent={<VictoryLabel dy={20} style={[{ fill: "#756f6a80" }]} />}

        style={{
          grid: {
            stroke: ({ tick }) => tick === 1 || tick === 25
              ? "#756f6a"
              : "#756f6a24",
          },
          tickLabels: { padding: 5 }
        }}
      />
      
      </VictoryChart>
    : <></>
}

export default LineChart