document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const circle = document.querySelector('.circle');
    const dot = document.querySelector('.dot');
    const unwrapBtn = document.getElementById('unwrap-btn');
    const resetBtn = document.getElementById('reset-btn');
    const unwrappedCircle = document.querySelector('.unwrapped-circle');
    const piMarker = document.querySelector('.pi-marker');
    const numberLine = document.querySelector('.number-line');
    
    // Add event listeners
    unwrapBtn.addEventListener('click', unwrapCircle);
    resetBtn.addEventListener('click', resetCircle);
    circle.addEventListener('click', function() {
        if (!circle.classList.contains('shrink-animation')) {
            unwrapCircle();
        }
    });
    
    // Function to unwrap the circle onto the number line
    function unwrapCircle() {
        // Hide unwrap button and show reset button
        unwrapBtn.classList.add('hidden');
        resetBtn.classList.remove('hidden');
        
        // Animate the circle shrinking
        circle.classList.add('shrink-animation');
        
        // Show the unwrapped circle on the number line
        unwrappedCircle.classList.remove('hidden');
        
        // Set the width with a transition for a smooth animation
        setTimeout(() => {
            // Set width to 78.5% (which is 3.14/4 * 100%)
            unwrappedCircle.style.width = '78.5%';
            unwrappedCircle.style.transition = 'width 2s ease-out';
            
            // Show the Pi marker after the animation completes
            setTimeout(() => {
                piMarker.classList.remove('hidden');
            }, 2000);
        }, 1000);
    }
    
    // Function to reset the circle
    function resetCircle() {
        // Hide reset button and show unwrap button
        resetBtn.classList.add('hidden');
        unwrapBtn.classList.remove('hidden');
        
        // Remove the shrink animation from the circle
        circle.classList.remove('shrink-animation');
        
        // Reset the circle's transform
        circle.style.transform = 'scale(1)';
        
        // Hide the unwrapped circle and reset its width
        unwrappedCircle.style.transition = 'none';
        unwrappedCircle.style.width = '0';
        unwrappedCircle.classList.add('hidden');
        
        // Hide the Pi marker
        piMarker.classList.add('hidden');
    }
    
    // Add a subtle pulse animation to the dot on page load
    setTimeout(() => {
        dot.style.animation = 'pulse 1.5s infinite';
        // Add the pulse keyframes if not already in the stylesheet
        if (!document.querySelector('#pulse-keyframes')) {
            const style = document.createElement('style');
            style.id = 'pulse-keyframes';
            style.textContent = `
                @keyframes pulse {
                    0% { transform: translate(50%, -50%) scale(1); }
                    50% { transform: translate(50%, -50%) scale(1.2); }
                    100% { transform: translate(50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }, 1000);
    
    // Add a pulse animation to the Pi marker
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes markerPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        .pi-label {
            animation: markerPulse 1.5s infinite;
        }
    `;
    document.head.appendChild(pulseStyle);
});
