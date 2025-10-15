// Chart.js - Comprehensive Chart Library for Dashboard EDP
// Contains all chart implementations for Charts 1-6

class DashboardCharts {
    constructor() {
        this.chartColors = {
            primary: '#8B5CF6',
            secondary: '#A78BFA',
            success: '#10B981',
            warning: '#F59E0B',
            danger: '#EF4444',
            info: '#3B82F6',
            gradients: {
                purple: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
                green: ['#10B981', '#34D399', '#6EE7B7'],
                blue: ['#3B82F6', '#60A5FA', '#93C5FD'],
                orange: ['#F59E0B', '#FBBF24', '#FCD34D']
            }
        };
    }

    // CHART 1 - Interactive Bar Chart (Student Data by Degree Level)
    createChart1(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const canvas = document.createElement('canvas');
        container.innerHTML = '';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        const data = {
            labels: ['ELEKTRONIKA', 'TELEKOMUNIKASI', 'INFORMATIKA', 'MULTIMEDIA'],
            values: [2595, 3113, 2191, 1949]
        };

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Jumlah Mahasiswa',
                    data: data.values,
                    backgroundColor: this.chartColors.gradients.purple,
                    borderColor: this.chartColors.primary,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Add stats below
        const statsHTML = `
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Mahasiswa:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${data.values.reduce((a, b) => a + b).toLocaleString()}</span>
                        <div class="stat-bar" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Rata-rata per Jenjang:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${Math.round(data.values.reduce((a, b) => a + b) / data.values.length).toLocaleString()}</span>
                        <div class="stat-bar" style="width: ${ (Math.round(data.values.reduce((a, b) => a + b) / data.values.length) / Math.max(...data.values)) * 100 }%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Jenjang Terbanyak:</span>
                    <span class="stat-value">${data.labels[data.values.indexOf(Math.max(...data.values))]}</span>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', statsHTML);
    }

    // CHART 2 - Line Chart (Semester Trends)
    createChart2(containerId) {
        console.log(`Rendering createChart2 in container: ${containerId}`);
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container with id ${containerId} not found.`);
            return;
        }
        console.log('Chart2 container found, rendering chart...');

        const data = {
            labels: ['ELEKTRONIKA', 'TELEKOMUNIKASI', 'ELEKTRO INDUSTRI', 'INFORMATIKA', 'MEKATRONIKA', 'TEK.KOMPUTER', 'SPE', 'TEK.GAME'],
            values: [3530, 2867, 3038, 3378, 3059, 3781, 2611, 3096],
            colors: this.chartColors.gradients.blue
        };

        const chartHTML = `
            <div class="chart-container">
                <div class="bar-chart">
                    ${data.labels.map((label, index) => `
                        <div class="bar-item">
                            <div class="bar-value">${data.values[index].toLocaleString()}</div>
                            <div class="bar" style="height: ${Math.round((data.values[index] / Math.max(...data.values)) * 80)}%; background: linear-gradient(to top, ${data.colors[0]}, ${data.colors[1]});"></div>
                            <div class="bar-label">${label}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(to top, ${data.colors[0]}, ${data.colors[1]});"></div>
                        <div class="legend-text">Jumlah Mahasiswa</div>
                    </div>
                </div>
            </div>
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Peningkatan:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">+${Math.round(((data.values[data.values.length - 1] - data.values[0]) / data.values[0]) * 100)}%</span>
                        <div class="stat-bar" style="width: ${Math.abs(Math.round(((data.values[data.values.length - 1] - data.values[0]) / data.values[0]) * 100)) }%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Semester Tertinggi:</span>
                    <span class="stat-value">${data.labels[data.values.indexOf(Math.max(...data.values))]}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Rata-rata:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${Math.round(data.values.reduce((a, b) => a + b) / data.values.length).toLocaleString()}</span>
                        <div class="stat-bar" style="width: ${ (Math.round(data.values.reduce((a, b) => a + b) / data.values.length) / Math.max(...data.values)) * 100 }%;"></div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    // CHART 3 - Pie Chart (Distribution by Study Program)
    createChart3(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = {
            labels: ['Teknik Informatika', 'Teknik Elektronika', 'Teknik Mesin', 'Teknik Elektro'],
            values: [35, 25, 20, 20],
            colors: this.chartColors.gradients.orange
        };

        const total = data.values.reduce((a, b) => a + b);
        let cumulativePercentage = 0;

        const chartHTML = `
            <div class="chart-container">
                <div class="pie-chart">
                    <svg class="pie-chart-svg" viewBox="0 0 200 200">
                        ${data.values.map((value, index) => {
                            const percentage = (value / total) * 100;
                            const startAngle = (cumulativePercentage / 100) * 360;
                            const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
                            cumulativePercentage += percentage;

                            const startAngleRad = (startAngle * Math.PI) / 180;
                            const endAngleRad = (endAngle * Math.PI) / 180;

                            const x1 = 100 + 80 * Math.cos(startAngleRad);
                            const y1 = 100 + 80 * Math.sin(startAngleRad);
                            const x2 = 100 + 80 * Math.cos(endAngleRad);
                            const y2 = 100 + 80 * Math.sin(endAngleRad);

                            const largeArcFlag = percentage > 50 ? 1 : 0;

                            return `<path d="M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z"
                                fill="${data.colors[index % data.colors.length]}"/>`;
                        }).join('')}
                    </svg>
                    <div class="pie-legend">
                        ${data.labels.map((label, index) => `
                            <div class="pie-legend-item">
                                <div class="pie-legend-color" style="background: ${data.colors[index % data.colors.length]};"></div>
                                <span>${label}: ${data.values[index]}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Jurusan:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${data.labels.length}</span>
                        <div class="stat-bar" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Jurusan Terbesar:</span>
                    <span class="stat-value">${data.labels[data.values.indexOf(Math.max(...data.values))]}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Distribusi Rata:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${Math.round(total / data.labels.length)}%</span>
                        <div class="stat-bar" style="width: ${Math.round(total / data.labels.length)}%;"></div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    // CHART 4 - Area Chart (Active vs Graduated Students 2023-2025)
    createChart4(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = {
            labels: ['2023', '2024', '2025'],
            active: [5200, 6100, 6850],
            graduated: [3200, 3800, 4320],
            colors: [this.chartColors.gradients.blue, this.chartColors.gradients.green]
        };

        const chartHTML = `
            <div class="chart-container">
                <div class="area-chart">
                    <svg class="area-chart-svg" viewBox="0 0 400 300">
                        <defs>
                            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${data.colors[0][0]};stop-opacity:0.8" />
                                <stop offset="100%" style="stop-color:${data.colors[0][1]};stop-opacity:0.1" />
                            </linearGradient>
                            <linearGradient id="graduatedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${data.colors[1][0]};stop-opacity:0.8" />
                                <stop offset="100%" style="stop-color:${data.colors[1][1]};stop-opacity:0.1" />
                            </linearGradient>
                        </defs>
                        <!-- Active students area -->
                        <polygon points="${this.generateAreaPoints(data.active, 400, 250)}"
                            fill="url(#activeGradient)" stroke="${data.colors[0][0]}" stroke-width="2"/>
                        <!-- Graduated students area -->
                        <polygon points="${this.generateAreaPoints(data.graduated, 400, 250)}"
                            fill="url(#graduatedGradient)" stroke="${data.colors[1][0]}" stroke-width="2"/>
                        <!-- Active students line -->
                        <polyline points="${this.generateLinePoints(data.active, 400, 250)}"
                            stroke="${data.colors[0][0]}" stroke-width="2" fill="none"/>
                        <!-- Graduated students line -->
                        <polyline points="${this.generateLinePoints(data.graduated, 400, 250)}"
                            stroke="${data.colors[1][0]}" stroke-width="2" fill="none"/>
                        <!-- Data points -->
                        ${data.active.map((value, index) => `
                            <circle cx="${50 + index * 175}" cy="${250 - ((value - 3200) / (6850 - 3200)) * 200}"
                                r="4" fill="${data.colors[0][0]}"/>
                        `).join('')}
                        ${data.graduated.map((value, index) => `
                            <circle cx="${50 + index * 175}" cy="${250 - ((value - 3200) / (6850 - 3200)) * 200}"
                                r="4" fill="${data.colors[1][0]}"/>
                        `).join('')}
                    </svg>
                    <div class="chart-labels">
                        ${data.labels.map(label => `<div class="label-item">${label}</div>`).join('')}
                    </div>
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: ${data.colors[0][0]}; width: 20px; height: 3px;"></div>
                        <div class="legend-text">Mahasiswa Aktif</div>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: ${data.colors[1][0]}; width: 20px; height: 3px;"></div>
                        <div class="legend-text">Mahasiswa Lulus</div>
                    </div>
                </div>
            </div>
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Aktif:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${data.active.reduce((a, b) => a + b).toLocaleString()}</span>
                        <div class="stat-bar" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Total Lulus:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${data.graduated.reduce((a, b) => a + b).toLocaleString()}</span>
                        <div class="stat-bar" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Tingkat Kelulusan:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${Math.round((data.graduated.reduce((a, b) => a + b) / (data.active.reduce((a, b) => a + b) + data.graduated.reduce((a, b) => a + b))) * 100)}%</span>
                        <div class="stat-bar" style="width: ${Math.round((data.graduated.reduce((a, b) => a + b) / (data.active.reduce((a, b) => a + b) + data.graduated.reduce((a, b) => a + b))) * 100)}%;"></div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    // CHART 5 - Mixed Chart (Student Statistics by Academic Status)
    createChart5(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = {
            labels: ['Aktif', 'Cuti', 'Lulus', 'DO', 'Non-Aktif'],
            barValues: [6850, 450, 4320, 180, 320],
            lineValues: [85, 15, 100, 8, 12],
            colors: [this.chartColors.gradients.blue, this.chartColors.gradients.orange]
        };

        const chartHTML = `
            <div class="chart-container">
                <div class="mixed-chart">
                    <svg class="mixed-chart-svg" viewBox="0 0 400 300">
                        ${data.barValues.map((value, index) => `
                            <rect x="${60 + index * 60}" y="${250 - (value / 7000) * 200}"
                                width="30" height="${(value / 7000) * 200}"
                                fill="${data.colors[0][0]}"/>
                        `).join('')}
                        <polyline points="${this.generateLinePoints(data.lineValues, 400, 250)}"
                            stroke="${data.colors[1][0]}" stroke-width="3" fill="none"/>
                        ${data.lineValues.map((value, index) => `
                            <circle cx="${75 + index * 60}" cy="${250 - (value / 100) * 200}"
                                r="4" fill="${data.colors[1][0]}"/>
                        `).join('')}
                    </svg>
                    <div class="chart-labels">
                        ${data.labels.map(label => `<div class="label-item">${label}</div>`).join('')}
                    </div>
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: ${data.colors[0][0]}; width: 15px; height: 15px;"></div>
                        <div class="legend-text">Jumlah Mahasiswa</div>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: ${data.colors[1][0]}; width: 20px; height: 3px;"></div>
                        <div class="legend-text">Persentase (%)</div>
                    </div>
                </div>
            </div>
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Mahasiswa:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${data.barValues.reduce((a, b) => a + b).toLocaleString()}</span>
                        <div class="stat-bar" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Status Terbanyak:</span>
                    <span class="stat-value">${data.labels[data.barValues.indexOf(Math.max(...data.barValues))]}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Rata-rata per Status:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${Math.round(data.barValues.reduce((a, b) => a + b) / data.barValues.length).toLocaleString()}</span>
                        <div class="stat-bar" style="width: ${ (Math.round(data.barValues.reduce((a, b) => a + b) / data.barValues.length) / Math.max(...data.barValues)) * 100 }%;"></div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    // CHART 6 - Custom Radar Chart (D3 Student Distribution by Study Program)
    createChart6(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = {
            labels: ['Teknik Informatika', 'Teknik Elektronika', 'Teknik Mesin', 'Teknik Elektro', 'Teknik Telekomunikasi', 'Teknik Mekatronika'],
            values: [650, 480, 420, 380, 320, 280],
            colors: this.chartColors.gradients.green
        };

        const centerX = 150;
        const centerY = 150;
        const radius = 100;

        const points = data.values.map((value, index) => {
            const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + (value / 700) * radius * Math.cos(angle);
            const y = centerY + (value / 700) * radius * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');

        const chartHTML = `
            <div class="chart-container">
                <div class="radar-chart">
                    <svg class="radar-chart-svg" viewBox="0 0 300 300">
                        <!-- Grid circles -->
                        ${[25, 50, 75, 100].map(level => `
                            <circle cx="${centerX}" cy="${centerY}" r="${(level / 100) * radius}"
                                fill="none" stroke="#e5e7eb" stroke-width="1"/>
                        `).join('')}
                        <!-- Grid lines -->
                        ${data.labels.map((_, index) => {
                            const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
                            const x = centerX + radius * Math.cos(angle);
                            const y = centerY + radius * Math.sin(angle);
                            return `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}"
                                stroke="#e5e7eb" stroke-width="1"/>`;
                        }).join('')}
                        <!-- Data area -->
                        <polygon points="${points} ${data.values[0] / 700 * radius * Math.cos(-Math.PI / 2) + centerX},${data.values[0] / 700 * radius * Math.sin(-Math.PI / 2) + centerY}"
                            fill="${data.colors[0]}" fill-opacity="0.3" stroke="${data.colors[0]}" stroke-width="2"/>
                        <!-- Data points -->
                        ${data.values.map((value, index) => {
                            const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
                            const x = centerX + (value / 700) * radius * Math.cos(angle);
                            const y = centerY + (value / 700) * radius * Math.sin(angle);
                            return `<circle cx="${x}" cy="${y}" r="4" fill="${data.colors[0]}"/>`;
                        }).join('')}
                    </svg>
                    <div class="radar-labels">
                        ${data.labels.map((label, index) => {
                            const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
                            const x = centerX + 120 * Math.cos(angle);
                            const y = centerY + 120 * Math.sin(angle);
                            return `<div class="radar-label" style="left: ${x}px; top: ${y}px;">${label}</div>`;
                        }).join('')}
                    </div>
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: ${data.colors[0]}; width: 15px; height: 15px; border-radius: 50%;"></div>
                        <div class="legend-text">Distribusi Mahasiswa D3</div>
                    </div>
                </div>
            </div>
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Mahasiswa D3:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${data.values.reduce((a, b) => a + b).toLocaleString()}</span>
                        <div class="stat-bar" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Program Studi Terbanyak:</span>
                    <span class="stat-value">${data.labels[data.values.indexOf(Math.max(...data.values))]}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Rata-rata per Program:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${Math.round(data.values.reduce((a, b) => a + b) / data.values.length).toLocaleString()}</span>
                        <div class="stat-bar" style="width: ${ (Math.round(data.values.reduce((a, b) => a + b) / data.values.length) / Math.max(...data.values)) * 100 }%;"></div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    // CHART 7 - Doughnut Chart (Student Enrollment by Faculty)
    createChart7(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = {
            labels: ['Fakultas Teknik Elektro', 'Fakultas Teknik Informatika', 'Fakultas Teknik Mesin', 'Fakultas Teknik Sipil'],
            values: [1800, 2200, 1500, 1200],
            colors: this.chartColors.gradients.purple
        };

        const total = data.values.reduce((a, b) => a + b);
        const innerRadius = 60;
        const outerRadius = 100;
        let cumulativePercentage = 0;

        const chartHTML = `
            <div class="chart-container">
                <div class="pie-chart">
                    <svg class="pie-chart-svg" viewBox="0 0 220 220">
                        ${data.values.map((value, index) => {
                            const percentage = (value / total) * 100;
                            const startAngle = (cumulativePercentage / 100) * 360;
                            const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
                            cumulativePercentage += percentage;

                            const startAngleRad = (startAngle * Math.PI) / 180;
                            const endAngleRad = (endAngle * Math.PI) / 180;

                            const x1Outer = 110 + outerRadius * Math.cos(startAngleRad);
                            const y1Outer = 110 + outerRadius * Math.sin(startAngleRad);
                            const x2Outer = 110 + outerRadius * Math.cos(endAngleRad);
                            const y2Outer = 110 + outerRadius * Math.sin(endAngleRad);

                            const x1Inner = 110 + innerRadius * Math.cos(endAngleRad);
                            const y1Inner = 110 + innerRadius * Math.sin(endAngleRad);
                            const x2Inner = 110 + innerRadius * Math.cos(startAngleRad);
                            const y2Inner = 110 + innerRadius * Math.sin(startAngleRad);

                            const largeArcFlag = percentage > 50 ? 1 : 0;

                            return `<path d="M ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer} L ${x1Inner} ${y1Inner} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x2Inner} ${y2Inner} Z"
                                fill="${data.colors[index % data.colors.length]}"/>`;
                        }).join('')}
                        <!-- Center circle for doughnut -->
                        <circle cx="110" cy="110" r="${innerRadius}" fill="white"/>
                        <text x="110" y="110" text-anchor="middle" dy="0.35em" font-size="14" font-weight="bold" fill="#333">${total.toLocaleString()}</text>
                        <text x="110" y="125" text-anchor="middle" font-size="10" fill="#666">Total</text>
                    </svg>
                    <div class="pie-legend">
                        ${data.labels.map((label, index) => `
                            <div class="pie-legend-item">
                                <div class="pie-legend-color" style="background: ${data.colors[index % data.colors.length]};"></div>
                                <span>${label}: ${data.values[index]} (${Math.round((data.values[index] / total) * 100)}%)</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Mahasiswa:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${total.toLocaleString()}</span>
                        <div class="stat-bar" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Fakultas Terbesar:</span>
                    <span class="stat-value">${data.labels[data.values.indexOf(Math.max(...data.values))]}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Rata-rata per Fakultas:</span>
                    <div class="stat-value-bar">
                        <span class="stat-value">${Math.round(total / data.labels.length).toLocaleString()}</span>
                        <div class="stat-bar" style="width: ${ (Math.round(total / data.labels.length) / Math.max(...data.values)) * 100 }%;"></div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = {
            labels: ['Teknik Informatika', 'Teknik Elektronika', 'Teknik Mesin', 'Teknik Elektro', 'Teknik Telekomunikasi', 'Teknik Mekatronika'],
            values: [650, 480, 420, 380, 320, 280],
            colors: this.chartColors.gradients.green
        };

        const centerX = 150;
        const centerY = 150;
        const radius = 100;

        const points = data.values.map((value, index) => {
            const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + (value / 700) * radius * Math.cos(angle);
            const y = centerY + (value / 700) * radius * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');

        const chartHTML = `
            <div class="chart-container">
                <div class="radar-chart">
                    <svg class="radar-chart-svg" viewBox="0 0 300 300">
                        <!-- Grid circles -->
                        ${[25, 50, 75, 100].map(level => `
                            <circle cx="${centerX}" cy="${centerY}" r="${(level / 100) * radius}"
                                fill="none" stroke="#e5e7eb" stroke-width="1"/>
                        `).join('')}
                        <!-- Grid lines -->
                        ${data.labels.map((_, index) => {
                            const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
                            const x = centerX + radius * Math.cos(angle);
                            const y = centerY + radius * Math.sin(angle);
                            return `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}"
                                stroke="#e5e7eb" stroke-width="1"/>`;
                        }).join('')}
                        <!-- Data area -->
                        <polygon points="${points} ${data.values[0] / 700 * radius * Math.cos(-Math.PI / 2) + centerX},${data.values[0] / 700 * radius * Math.sin(-Math.PI / 2) + centerY}"
                            fill="${data.colors[0]}" fill-opacity="0.3" stroke="${data.colors[0]}" stroke-width="2"/>
                        <!-- Data points -->
                        ${data.values.map((value, index) => {
                            const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
                            const x = centerX + (value / 700) * radius * Math.cos(angle);
                            const y = centerY + (value / 700) * radius * Math.sin(angle);
                            return `<circle cx="${x}" cy="${y}" r="4" fill="${data.colors[0]}"/>`;
                        }).join('')}
                    </svg>
                    <div class="radar-labels">
                        ${data.labels.map((label, index) => {
                            const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
                            const x = centerX + 120 * Math.cos(angle);
                            const y = centerY + 120 * Math.sin(angle);
                            return `<div class="radar-label" style="left: ${x}px; top: ${y}px;">${label}</div>`;
                        }).join('')}
                    </div>
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: ${data.colors[0]}; width: 15px; height: 15px; border-radius: 50%;"></div>
                        <div class="legend-text">Distribusi Mahasiswa D3</div>
                    </div>
                </div>
            </div>
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Mahasiswa D3:</span>
                    <span class="stat-value">${data.values.reduce((a, b) => a + b).toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Program Studi Terbanyak:</span>
                    <span class="stat-value">${data.labels[data.values.indexOf(Math.max(...data.values))]}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Rata-rata per Program:</span>
                    <span class="stat-value">${Math.round(data.values.reduce((a, b) => a + b) / data.values.length).toLocaleString()}</span>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    // Utility Functions
    generateLinePoints(values, width, height) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;

        return values.map((value, index) => {
            const x = 50 + (index / (values.length - 1)) * (width - 100);
            const y = height - 50 - ((value - min) / range) * (height - 100);
            return `${x},${y}`;
        }).join(' ');
    }

    generateAreaPoints(values, width, height) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;

        const linePoints = values.map((value, index) => {
            const x = 50 + (index / (values.length - 1)) * (width - 100);
            const y = height - 50 - ((value - min) / range) * (height - 100);
            return `${x},${y}`;
        });

        const basePoints = values.map((_, index) => {
            const x = 50 + (index / (values.length - 1)) * (width - 100);
            return `${x},${height - 50}`;
        });

        return `${linePoints.join(' ')} ${basePoints.reverse().join(' ')}`;
    }

    addBarChartInteractivity(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const bars = container.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.addEventListener('click', () => {
                const barValue = bar.parentElement.querySelector('.bar-value').textContent;
                const barLabel = bar.parentElement.querySelector('.bar-label').textContent;
                this.showChartTooltip(barLabel, barValue, 'mahasiswa');
            });
        });
    }

    showChartTooltip(label, value, unit) {
        // Create and show tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.innerHTML = `
            <strong>${label}</strong><br>
            ${value} ${unit}
        `;
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
        `;

        document.body.appendChild(tooltip);

        // Position tooltip at mouse cursor
        document.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 10 + 'px';
        });

        // Remove tooltip after 3 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000);
    }

    // Initialize all charts
    init() {
        // Auto-initialize charts based on container IDs
        const chartContainers = document.querySelectorAll('[id^="chart"]');
        chartContainers.forEach(container => {
            const chartNumber = container.id.replace('chart', '');
            if (this[`createChart${chartNumber}`]) {
                this[`createChart${chartNumber}`](container.id);
            }
        });
    }

    // Optimasi render grafik dengan debounce untuk resize window
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Fungsi untuk memperbarui grafik saat ukuran jendela berubah
    handleResize() {
        const chartContainers = document.querySelectorAll('[id^="chart"]');
        chartContainers.forEach(container => {
            const chartNumber = container.id.replace('chart', '');
            if (this[`createChart${chartNumber}`]) {
                this[`createChart${chartNumber}`](container.id);
            }
        });
    }

    // Perbaikan tooltip agar lebih informatif dan tidak mengganggu
    showChartTooltip(label, value, unit) {
        // Hapus tooltip lama jika ada
        const oldTooltip = document.querySelector('.chart-tooltip');
        if (oldTooltip) oldTooltip.remove();

        // Buat tooltip baru
        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.innerHTML = `
            <strong>${label}</strong><br>
            ${value} ${unit}
        `;
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 13px;
            z-index: 10000;
            pointer-events: none;
            transition: opacity 0.3s ease;
            opacity: 0;
        `;

        document.body.appendChild(tooltip);

        // Posisi tooltip mengikuti kursor mouse dengan offset
        const moveTooltip = (e) => {
            const padding = 10;
            let left = e.pageX + padding;
            let top = e.pageY + padding;

            // Cegah tooltip keluar dari viewport kanan dan bawah
            if (left + tooltip.offsetWidth > window.innerWidth) {
                left = e.pageX - tooltip.offsetWidth - padding;
            }
            if (top + tooltip.offsetHeight > window.innerHeight) {
                top = e.pageY - tooltip.offsetHeight - padding;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
            tooltip.style.opacity = '1';
        };

        document.addEventListener('mousemove', moveTooltip);

        // Hapus tooltip dan event listener setelah 3 detik
        setTimeout(() => {
            tooltip.style.opacity = '0';
            document.removeEventListener('mousemove', moveTooltip);
            setTimeout(() => {
                if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
            }, 300);
        }, 3000);
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboardCharts = new DashboardCharts();
    dashboardCharts.init();

    // Make charts globally accessible
    window.DashboardCharts = dashboardCharts;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardCharts;
}
